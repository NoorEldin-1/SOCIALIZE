<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Post;
use App\Models\PostLike;
use App\Models\PostShare;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createPost() {
        $validator = Validator::make(request()->all(), [
            'content' => 'required|string|min:5',
            'image' => 'nullable|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = request()->user();

        if (request()->hasFile('image')) {
            $file = request()->file('image');
            $imagePath = $file->store('postsImages', 'public');
            $post = $user->posts()->create([
                'content' => request('content'),
                'image' => $imagePath,
            ]);

            $post->image = Storage::url($post->image);


            return response()->json(['post' => $post], 201);
        } else {
            $post = $user->posts()->create([
                'content' => request('content'),
            ]);

            return response()->json(['post' => $post], 201);
        }
    }

    public function profilePosts($username) {
        $mainUser = request()->user();
        $user = User::where('username', $username)->first();
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $posts = Post::where('user_id', $user->id)->with('user')->withCount('likes')->withCount('shares')->withCount('comments')->latest("id", "desc")->paginate(4);

        foreach ($posts as $post) {
            $post->liked = $post->likes->contains('user_id', $mainUser->id);
            $post->shared = $post->shares->contains('user_id', $mainUser->id);
            if ($post->image) {
                $post->image = Storage::url($post->image);
            }
            if ($post->user->profileImage && !str_starts_with($post->user->profileImage, '/storage/')) {
                $post->user->profileImage = Storage::url($post->user->profileImage);
            }
            if ($post->user->coverImage && !str_starts_with($post->user->coverImage, '/storage/')) {
                $post->user->coverImage = Storage::url($post->user->coverImage);
            }
        }

        return response()->json(['posts' => $posts], 200);
    }

    public function deletePost($id) {
        $user = request()->user();
        $post = Post::where('user_id', $user->id)->where('id', $id)->first();

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        if ($post->image) {
            $oldPostImagePathInDB = $post->image;
                if (str_starts_with($oldPostImagePathInDB, 'http://') || str_starts_with($oldPostImagePathInDB, 'https://')) {
                    $storagePathStart = strpos($oldPostImagePathInDB, '/storage/');
                    if ($storagePathStart !== false) {
                        $oldPostImagePathInDB = substr($oldPostImagePathInDB, $storagePathStart + strlen('/storage/'));
                    }
                }
                Storage::disk('public')->delete($oldPostImagePathInDB);
        }

        $post->delete();        
    }

    public function forYou() {
        $user = request()->user();
        $following = Follow::where('from_user_id', $user->id)->get();

        $posts = Post::whereNotIn('user_id', $following->pluck('to_user_id'))->where('user_id', '!=', $user->id)->with('user')->withCount('likes')->withCount('shares')->withCount('comments')->latest("id", "desc")->paginate(4);

        foreach ($posts as $post) {
            $post->liked = $post->likes->contains('user_id', $user->id);
            $post->shared = $post->shares->contains('user_id', $user->id);

            if ($post->image && !str_starts_with($post->image, '/storage/')) {
                $post->image = Storage::url($post->image);
            }
            if ($post->user->profileImage && !str_starts_with($post->user->profileImage, '/storage/')) {
                $post->user->profileImage = Storage::url($post->user->profileImage);
            }
            if ($post->user->coverImage && !str_starts_with($post->user->coverImage, '/storage/')) {
                $post->user->coverImage = Storage::url($post->user->coverImage);
            }
        }

        return response()->json(['posts' => $posts], 200);
    }

    public function following() {
        $user = request()->user();
        $following = Follow::where('from_user_id', $user->id)->get();

        $posts = Post::whereIn('user_id', $following->pluck('to_user_id'))->where('user_id', '!=', $user->id)->with('user')->withCount('likes')->withCount('shares')->withCount('comments')->latest("id", "desc")->paginate(4);

        foreach ($posts as $post) {
            $post->liked = $post->likes->contains('user_id', $user->id);
            $post->shared = $post->shares->contains('user_id', $user->id);
            
            if ($post->image && !str_starts_with($post->image, '/storage/')) {
                $post->image = Storage::url($post->image);
            }
            if ($post->user->profileImage && !str_starts_with($post->user->profileImage, '/storage/')) {
                $post->user->profileImage = Storage::url($post->user->profileImage);
            }
            if ($post->user->coverImage && !str_starts_with($post->user->coverImage, '/storage/')) {
                $post->user->coverImage = Storage::url($post->user->coverImage);
            }
        }

        return response()->json(['posts' => $posts], 200);
    }

    public function likes($username) {
        $mainUser = request()->user();
        $user = User::where('username', $username)->first();
        $likes = PostLike::where('user_id', $user->id)->get();
        $posts = Post::whereIn('id', $likes->pluck('post_id'))->where('user_id', '!=', $mainUser->id)->with('user')->withCount('likes')->withCount('shares')->withCount('comments')->latest("id", "desc")->paginate(4);

        foreach ($posts as $post) {
            $post->liked = $post->likes->contains('user_id', $mainUser->id);
            $post->shared = $post->shares->contains('user_id', $mainUser->id);

            if ($post->image && !str_starts_with($post->image, '/storage/')) {
                $post->image = Storage::url($post->image);
            }
            if ($post->user->profileImage && !str_starts_with($post->user->profileImage, '/storage/')) {
                $post->user->profileImage = Storage::url($post->user->profileImage);
            }
            if ($post->user->coverImage && !str_starts_with($post->user->coverImage, '/storage/')) {
                $post->user->coverImage = Storage::url($post->user->coverImage);
            }
        }

        return response()->json(['posts' => $posts], 200);
    }

    public function shares($username) {
        $mainUser = request()->user();
        $user = User::where('username', $username)->first();
        $shares = PostShare::where('user_id', $user->id)->get();
        $posts = Post::whereIn('id', $shares->pluck('post_id'))->where('user_id', '!=', $mainUser->id)->with('user')->withCount('likes')->withCount('shares')->withCount('comments')->latest("id", "desc")->paginate(4);

        foreach ($posts as $post) {
            $post->liked = $post->likes->contains('user_id', $mainUser->id);
            $post->shared = $post->shares->contains('user_id', $mainUser->id);

            if ($post->image && !str_starts_with($post->image, '/storage/')) {
                $post->image = Storage::url($post->image);
            }
            if ($post->user->profileImage && !str_starts_with($post->user->profileImage, '/storage/')) {
                $post->user->profileImage = Storage::url($post->user->profileImage);
            }
            if ($post->user->coverImage && !str_starts_with($post->user->coverImage, '/storage/')) {
                $post->user->coverImage = Storage::url($post->user->coverImage);
            }
        }

        return response()->json(['posts' => $posts], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostLike;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class PostLikeController extends Controller
{
    public function toggleLike($post_id) {
        $user = request()->user();
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(["message" => "Post not found"]);
        }

        $like = PostLike::where("user_id", $user->id)->where("post_id", $post_id)->first();

        if (!$like) {
            PostLike::create(["user_id" => $user->id, "post_id" => $post_id]);
        } else {
            $like->delete();
        }
        
        return response()->json(["post_id" => $post_id]);
    }

    public function postLikes($post_id) {
        $likes = PostLike::where("post_id", $post_id)->latest("id", "desc")->get();
        $users = User::whereIn("id", $likes->pluck("user_id"))->get();
        foreach ($users as $user) {
            if ($user->profileImage) {
                $user->profileImage = Storage::url($user->profileImage);
            }
            if ($user->coverImage) {
                $user->coverImage = Storage::url($user->coverImage);
            }
        }

        return response()->json(["users" => $users]);
    }
}

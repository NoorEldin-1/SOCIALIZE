<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostShare;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class PostShareController extends Controller
{
    public function toggleShare($post_id) {
        $user = request()->user();
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(["message" => "Post not found"]);
        }

        $share = PostShare::where("user_id", $user->id)->where("post_id", $post_id)->first();

        if (!$share) {
            PostShare::create(["user_id" => $user->id, "post_id" => $post_id]);
        } else {
            $share->delete();
        }

        return response()->json(["post_id" => $post_id]);
    }

    public function postShares($post_id) {
        $shares = PostShare::where("post_id", $post_id)->latest("id", "desc")->get();
        $users = User::whereIn("id", $shares->pluck("user_id"))->get();

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

<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostCommentController extends Controller
{
    public function postComment($post_id) {
        $user_id = request()->user()->id;
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(["message" => "Post not found"], 404);
        }

        $validator = Validator::make(request()->all(), [
            "comment" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => "Validation failed"], 422);
        }

        $comment = PostComment::create([
            "post_id" => $post_id,
            "user_id" => $user_id,
            "comment" => request("comment"),
        ]);

        $comment = PostComment::where("id", $comment->id)->with("user")->first();

        if ($comment->user->profileImage) {
            $comment->user->profileImage = Storage::url($comment->user->profileImage);
        }

        if ($comment->user->coverImage) {
            $comment->user->coverImage = Storage::url($comment->user->coverImage);
        }

        return response()->json(["comment" => $comment]);
    }

    public function postComments($post_id) {
        $comments = PostComment::where("post_id", $post_id)->with("user")->latest("id", "desc")->get();

        foreach ($comments as $comment) {
            if ($comment->user->profileImage && !str_starts_with($comment->user->profileImage, "/storage/")) {
                $comment->user->profileImage = Storage::url($comment->user->profileImage);
            }

            if ($comment->user->coverImage && !str_starts_with($comment->user->coverImage, "/storage/")) {
                $comment->user->coverImage = Storage::url($comment->user->coverImage);
            }
        }

        return response()->json(["comments" => $comments]);
    }
}

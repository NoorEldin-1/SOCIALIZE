<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FollowController extends Controller
{
    public function addFollow($from_user_id, $to_user_id) {
        $follow = Follow::where('from_user_id', $from_user_id)->where('to_user_id', $to_user_id)->first();

        if ($follow) {
            $follow->delete();
        }

        Follow::create(['from_user_id' => $from_user_id, 'to_user_id' => $to_user_id]);
        

        return response()->json(['message' => 'Follow added'], 200);
    }

    public function deleteFollow($from_user_id, $to_user_id) {
        Follow::where('from_user_id', $from_user_id)->where('to_user_id', $to_user_id)->delete();
        return response()->json(['message' => 'Follow deleted'], 200);
    }

    public function getFollow($from_user_id, $to_user_id) {
        $follow = Follow::where('from_user_id', $from_user_id)->where('to_user_id', $to_user_id)->first();

        if ($follow) {
            return response()->json(['message' => 'follow']);
        } else {
            return response()->json(['message' => 'not follow']);
        }
    }

    public function getFollowers($user_id) {
        $followers = Follow::where('to_user_id', $user_id)->get()->map(function($follow) {
            return $follow->from_user_id;
        });

        $users = User::whereIn('id', $followers)->get();

        foreach ($users as $user) {
            $user->profileImage = $user->profileImage ? Storage::url($user->profileImage) : $user->profileImage;
            $user->coverImage = $user->coverImage ? Storage::url($user->coverImage) : $user->coverImage;
        }

        return response()->json(['followers' => $users]);
    }

    public function getFollowing($user_id) {
        $following = Follow::where('from_user_id', $user_id)->get()->map(function($follow) {
            return $follow->to_user_id;
        });

        $users = User::whereIn('id', $following)->get();

        foreach ($users as $user) {
            $user->profileImage = $user->profileImage ? Storage::url($user->profileImage) : $user->profileImage;
            $user->coverImage = $user->coverImage ? Storage::url($user->coverImage) : $user->coverImage;
        }

        return response()->json(['following' => $users]);
    }
}

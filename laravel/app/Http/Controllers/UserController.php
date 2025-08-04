<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function signup() {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|min:3|max:255',
            'username' => 'required|string|min:3|max:255|unique:users',
            'password' => 'required|string|min:8|max:255',
            'confirm_password' => 'required|string|min:8|max:255|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => request('name'),
            'username' => request('username'),
            'password' => Hash::make(request('password')),
            'profileImage' => null,
            'coverImage' => null,
            'showLikes' => true,
            'showShares' => true,
            'showFollowers' => true,
            'showFollowing' => true,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function login() {
            $user = User::where('username', request('username'))->first();
            
            if (!$user) {
                return response()->json(['message' => 'credentials are incorrect'], 404);
            }
            
            if (!Hash::check(request('password'), $user->password)) {
                return response()->json(['message' => 'credentials are incorrect'], 401);
            }
            
            $token = $user->createToken('auth_token')->plainTextToken;
            
            $user->profileImage = $user->profileImage ? Storage::url($user->profileImage) : null;
            $user->coverImage = $user->coverImage ? Storage::url($user->coverImage) : null;
            
            return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout() {
        request()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function deleteAccount() {
        $user = request()->user();
        if ($user->profileImage) {
            Storage::delete(str_replace('storage/', '', $user->profileImage));
        }
        if ($user->coverImage) {
            Storage::delete(str_replace('storage/', '', $user->coverImage));
        }
        $user->delete();
        return response()->json(['message' => 'Account deleted successfully']);
    }

    public function editAccount() {
        if (request()->hasFile('profileImage')) {
            $file = request()->file('profileImage');
            
        }
        if (request()->hasFile('coverImage')) {
            $file = request()->file('coverImage');
        }

        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|min:3|max:255',
            'profileImage' => 'nullable|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif',
            'coverImage' => 'nullable|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif',
            'showLikes' => 'boolean',
            'showShares' => 'boolean',
            'showFollowers' => 'boolean',
            'showFollowing' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = request()->user();

        if (request()->hasFile('profileImage') && $user->profileImage) {
            $oldProfileImagePathInDB = $user->profileImage;
                if (str_starts_with($oldProfileImagePathInDB, 'http://') || str_starts_with($oldProfileImagePathInDB, 'https://')) {
                    $storagePathStart = strpos($oldProfileImagePathInDB, '/storage/');
                    if ($storagePathStart !== false) {
                        $oldProfileImagePathInDB = substr($oldProfileImagePathInDB, $storagePathStart + strlen('/storage/'));
                    }
                }
                Storage::disk('public')->delete($oldProfileImagePathInDB);
        }
        if (request()->hasFile('coverImage') && $user->coverImage) {
            $oldCoverImagePathInDB = $user->coverImage;
                if (str_starts_with($oldCoverImagePathInDB, 'http://') || str_starts_with($oldCoverImagePathInDB, 'https://')) {
                    $storagePathStart = strpos($oldCoverImagePathInDB, '/storage/');
                    if ($storagePathStart !== false) {
                        $oldCoverImagePathInDB = substr($oldCoverImagePathInDB, $storagePathStart + strlen('/storage/'));
                    }
                }
                Storage::disk('public')->delete($oldCoverImagePathInDB);
        }

        if (request()->hasFile('profileImage')) {
            $profileImagePath = request()->file('profileImage')->store('profileImages', 'public');
            $user->profileImage = $profileImagePath;
        } else if (request()->has('profileImage') && request('profileImage') === null) {
            $user->profileImage = null;
        }


        if (request()->hasFile('coverImage')) {
            $coverImagePath = request()->file('coverImage')->store('coverImages', 'public');
            $user->coverImage = $coverImagePath;
        } else if (request()->has('coverImage') && request('coverImage') === null) {
            $user->coverImage = null;
        }

        $user->name = request('name');
        $user->showLikes = (bool)request('showLikes');
        $user->showShares = (bool)request('showShares');
        $user->showFollowers = (bool)request('showFollowers');
        $user->showFollowing = (bool)request('showFollowing');

        $user->save();

        $user->profileImage = $user->profileImage ? Storage::url($user->profileImage) : null;
        $user->coverImage = $user->coverImage ? Storage::url($user->coverImage) : null;

        return response()->json(['user' => $user]);
    }

    public function getProfile($username) { 
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->profileImage = $user->profileImage ? Storage::url($user->profileImage) : null;
        $user->coverImage = $user->coverImage ? Storage::url($user->coverImage) : null;

        return response()->json(['user' => $user]);
    }
}
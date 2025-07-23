<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout() {
        request()->user()->tokens()->delete();
    }

    public function deleteAccount() {
        request()->user()->delete();
    }
}

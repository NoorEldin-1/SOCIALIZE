<?php

use App\Http\Controllers\CommunityPostController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/signup', [UserController::class, 'signup']);
Route::post('/login', [UserController::class, 'login']);
Route::delete('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::delete('/deleteAccount', [UserController::class, 'deleteAccount'])->middleware('auth:sanctum');
Route::post('/editAccount', [UserController::class, 'editAccount'])->middleware('auth:sanctum');
Route::get('/getProfile/{username}', [UserController::class, 'getProfile'])->middleware('auth:sanctum');

Route::post('/createPost', [PostController::class, 'createPost'])->middleware('auth:sanctum');
Route::get('/profile/{username}/posts', [PostController::class, 'profilePosts'])->middleware('auth:sanctum');
Route::delete('/deletePost/{id}', [PostController::class, 'deletePost'])->middleware('auth:sanctum');
Route::get('/posts/forYou', [PostController::class, 'forYou'])->middleware('auth:sanctum');
Route::get('/posts/following', [PostController::class, 'following'])->middleware('auth:sanctum');

Route::post("/addFollow/{from_user_id}/{to_user_id}", [FollowController::class, 'addFollow'])->middleware('auth:sanctum');
Route::delete("/deleteFollow/{from_user_id}/{to_user_id}", [FollowController::class, 'deleteFollow'])->middleware('auth:sanctum');
Route::get("/getFollow/{from_user_id}/{to_user_id}", [FollowController::class, 'getFollow'])->middleware('auth:sanctum');
Route::get("/getFollowers/{user_id}", [FollowController::class, 'getFollowers'])->middleware('auth:sanctum');
Route::get("/getFollowing/{user_id}", [FollowController::class, 'getFollowing'])->middleware('auth:sanctum');

Route::post("/community/createPost", [CommunityPostController::class, 'createPost']);
Route::get("/community/posts", [CommunityPostController::class, 'getPosts']);
Route::delete("/community/posts/delete/{id}/{username}/{password}", [CommunityPostController::class, 'deletePost']);

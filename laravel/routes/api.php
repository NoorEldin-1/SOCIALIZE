<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\CommunityPostController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\PostShareController;
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
Route::get('/posts/likes/{username}', [PostController::class, 'likes'])->middleware('auth:sanctum');
Route::get('/posts/shares/{username}', [PostController::class, 'shares'])->middleware('auth:sanctum');

Route::post("/addFollow/{from_user_id}/{to_user_id}", [FollowController::class, 'addFollow'])->middleware('auth:sanctum');
Route::delete("/deleteFollow/{from_user_id}/{to_user_id}", [FollowController::class, 'deleteFollow'])->middleware('auth:sanctum');
Route::get("/getFollow/{from_user_id}/{to_user_id}", [FollowController::class, 'getFollow'])->middleware('auth:sanctum');
Route::get("/getFollowers/{username}", [FollowController::class, 'getFollowers'])->middleware('auth:sanctum');
Route::get("/getFollowing/{username}", [FollowController::class, 'getFollowing'])->middleware('auth:sanctum');

Route::post("/postLike/{post_id}", [PostLikeController::class, "toggleLike"])->middleware('auth:sanctum');
Route::get("/postLike/{post_id}", [PostLikeController::class, "postLikes"])->middleware('auth:sanctum');

Route::post("/postShare/{post_id}", [PostShareController::class, "toggleShare"])->middleware('auth:sanctum');
Route::get("/postShare/{post_id}", [PostShareController::class, "postShares"])->middleware('auth:sanctum');

Route::post("/postComment/{post_id}", [PostCommentController::class, "postComment"])->middleware('auth:sanctum');
Route::get("/postComments/{post_id}", [PostCommentController::class, "postComments"])->middleware('auth:sanctum');

Route::post("/createConversation/{name}", [ChatController::class, "createConversation"])->middleware('auth:sanctum');
Route::post("/sendMessage/{conversation_id}", [ChatController::class, "sendMessage"])->middleware('auth:sanctum');
Route::get("/getMessages/{conversation_id}", [ChatController::class, "getMessages"])->middleware('auth:sanctum');
<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/signup', [UserController::class, 'signup']);
Route::post('/login', [UserController::class, 'login']);
Route::delete('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::delete('/deleteAccount', [UserController::class, 'deleteAccount'])->middleware('auth:sanctum');

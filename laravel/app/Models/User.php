<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'name',
        'username',
        'password',
        'profileImage',
        'coverImage',
        'showLikes',
        'showShares',
        'showFollowers',
        'showFollowing',
    ];

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function follows() {
        return $this->hasMany(Follow::class);
    }

    public function likes() {
        return $this->hasMany(PostLike::class);
    }

    public function shares() {
        return $this->hasMany(PostShare::class);
    }

    public function comments() {
        return $this->hasMany(PostComment::class);
    }

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

}

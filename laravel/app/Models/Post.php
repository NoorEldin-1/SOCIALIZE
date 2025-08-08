<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['content', 'image', 'user_id'];

    public function user() {
        return $this->belongsTo(User::class);
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
}

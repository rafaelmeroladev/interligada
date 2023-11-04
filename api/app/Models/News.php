<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'news';

    protected $fillable = [
        'title', 'text', 'date_time', 'image', 'audio', 'user_id', 'category', 'highlight', 'image_highlight'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}

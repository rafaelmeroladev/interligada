<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'text',
        'date_time',
        'image',
        'audio',
        'user_id',
        'category',
        'highlight',
        'image_highlight',
        'slug'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($news) {
            $news->slug = Str::slug($news->title);
        });

        static::updating(function ($news) {
            // Se o título mudou, atualiza o slug também
            if ($news->isDirty('title')) {
                $news->slug = Str::slug($news->title);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}

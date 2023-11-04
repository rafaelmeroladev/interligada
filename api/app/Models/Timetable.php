<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Timetable extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'timetables';

    protected $fillable = [
        'user_id', 'day_week', 'hour_start', 'hour_finish'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}

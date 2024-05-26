<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RequestProgram extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'request_program';

    protected $fillable = [
        'user_id',
        'timetable_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function timetable()
    {
        return $this->belongsTo(Timetable::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Requests extends Model
{
    use HasFactory, SoftDeletes; 

    protected $table = 'requests';

    protected $fillable = [
        'speaker_id', 'type', 'email', 'phone', 'read', 'menssage'
    ];

    public function speaker() {
        return $this->belongsTo(User::class, 'speaker_id');
    }
}

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
        'request_program_id', 'type', 'email', 'phone', 'read', 'message', 'name', 'state', 'city'
    ];

    public function requestProgram() {
        return $this->belongsTo(RequestProgram::class);
    }
}

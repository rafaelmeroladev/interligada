<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sponsor extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sponsors';

    protected $fillable = [
        'nome', 'link', 'ref', 'imagem', 'expirated_date', 'status', 'position'
    ];

    protected $casts = [
        'expirated_date' => 'date',
        'status' => 'string',
        'position'      => 'integer',
    ];
}

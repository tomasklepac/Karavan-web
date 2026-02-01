<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'from',
        'to',
        'name',
        'email',
        'phone',
        'note',
        'status',
    ];

    protected $casts = [
        'from' => 'datetime',
        'to' => 'datetime',
    ];
}

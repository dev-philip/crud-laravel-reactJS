<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class booksrecord extends Model
{
    use HasFactory;
    protected $fillable = [
        'book_name',
        'book_author',
        'quantity',
        'book_price',
        'date',
        'time'
    ];
}


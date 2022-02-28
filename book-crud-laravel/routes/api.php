<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;


Route::get('/getbooks', [BookController::class, 'getListOfBooks']);
Route::post('/saveabook', [BookController::class, 'saveABook']);
Route::delete('/deleteabook/{id}', [BookController::class, 'deleteABook']);
Route::get('/getonebook/{id}', [BookController::class, 'getOneBook']);
Route::post('/updateabook/{id}', [BookController::class, 'updateABook']);

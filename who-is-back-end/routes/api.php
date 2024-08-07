<?php

use App\Http\Controllers\WhoIsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/whois-info', [WhoIsController::class, 'getWhoisInfo']);

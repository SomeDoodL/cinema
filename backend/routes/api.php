<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Optional token API routes for mobile apps
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

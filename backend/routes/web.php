<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\BlogController;
// Homepage (optional)
Route::get('/', function () {
    return view('welcome');
});

// ------------------------
// Auth routes (session-based)
// ------------------------
Route::middleware(['web'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// ------------------------
// Public blog routes
// ------------------------
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('blogs.show');

// ------------------------
// Admin-only blog management
// ------------------------
Route::middleware(['web', 'auth', 'is.admin'])->group(function () {
    Route::get('/admin/blogs', [BlogController::class, 'adminIndex'])->name('admin.blogs.index');
    Route::get('/admin/blogs/create', [BlogController::class, 'create'])->name('admin.blogs.create');
    Route::post('/admin/blogs', [BlogController::class, 'store'])->name('admin.blogs.store');
});

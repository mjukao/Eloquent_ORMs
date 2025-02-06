<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('products', [ProductController::class, 'index']); // แสดงรายการสินค้าจาก ProductController

Route::get('/rooms', [RoomController::class, 'index']);

Route::get('/student', [StudentController::class, 'index'])->middleware(['auth', 'verified'])->name('Student/Index');

Route::get('/students', [StudentController::class, 'index'])->middleware(['auth', 'verified'])->name('students.index');
Route::get('/students/create', [StudentController::class, 'create'])->middleware(['auth', 'verified'])->name('students.create');
Route::post('/students', [StudentController::class, 'store'])->middleware(['auth', 'verified'])->name('students.store');
Route::delete('/students/{id}', [StudentController::class, 'destroy'])->middleware(['auth', 'verified'])->name('students.destroy');
Route::get('/students/{id}/edit', [StudentController::class, 'edit'])->middleware(['auth', 'verified'])->name('students.edit');
Route::put('/students/{id}', [StudentController::class, 'update'])->middleware(['auth', 'verified'])->name('students.update');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

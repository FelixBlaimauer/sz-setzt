<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use App\Models\Team;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'des/destroy'])->name('profile.destroy');
    Route::get('/profile/deposit', [ProfileController::class, 'deposit'])->name('profile.deposit');

    // TODO: change permission to view
    Route::get('/admin', [AdminController::class, 'index'])->can('create', Team::class)->name('admin.index');
    Route::get('/admin/deposit', [AdminController::class, 'deposit'])->can('create', Team::class)->name('admin.deposit');

    Route::post('/teams', [TeamController::class, 'store'])->can('create', Team::class)->name('teams.store');
    Route::delete('/teams/{team}', [TeamController::class, 'destroy'])->can('delete', Team::class)->name('teams.destroy');
});

require __DIR__.'/auth.php';

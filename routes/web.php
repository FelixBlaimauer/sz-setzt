<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BetController;
use App\Http\Controllers\GameBetController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TransactionController;
use App\Models\Bet;
use App\Models\Game;
use App\Models\Team;
use App\Models\Transaction;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/', [GameController::class, 'userGames'])->name('games.index');
Route::get('/games/{game}', [GameController::class, 'show'])->name('games.show');

Route::get('/groups', [GroupController::class, 'index'])->name('groups.index');

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'des/destroy'])->name('profile.destroy');
    Route::get('/profile/deposit', [ProfileController::class, 'deposit'])->name('profile.deposit');
    Route::get('/profile/transactions', [ProfileController::class, 'transactions'])->name('profile.transactions');
    Route::get('/profile/bets', [ProfileController::class, 'bets'])->name('profile.bets');

    // TODO: change permission to view
    Route::get('/admin', [AdminController::class, 'index'])->can('create', Team::class)->name('admin.index');
    Route::get('/admin/deposit/{user}', [AdminController::class, 'deposit'])->can('create', Transaction::class)->name('admin.deposit');

    Route::post('/teams', [TeamController::class, 'store'])->can('create', Team::class)->name('teams.store');
    Route::delete('/teams/{team}', [TeamController::class, 'destroy'])->can('delete', Team::class)->name('teams.destroy');

    Route::post('/games', [GameController::class, 'store'])->can('create', Game::class)->name('games.store');
    Route::delete('/games/{game}', [GameController::class, 'destroy'])->can('delete', Game::class)->name('games.destroy');

    Route::post('/transaction', [TransactionController::class, 'store'])->can('create', Transaction::class)->name('transaction.store');

    Route::post('/bet/game', [GameBetController::class, 'store'])->name('bet.game.store');
});

require __DIR__.'/auth.php';

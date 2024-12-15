<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->user()->cannot('create', Team::class)) {
            abort(403);
        }

        return Inertia::render('Admin/Index', [
            'teams' => fn () => Team::with('players')->get(),
            'games' => fn () => Game::with('goals')->get(),
        ]);
    }

    public function deposit(Request $request, User $user): Response
    {
        if ($request->user()->cannot('create', Team::class)) {
            abort(403);
        }

        return Inertia::render('Admin/Deposit', [
            'user' => $user,
        ]);
    }
}

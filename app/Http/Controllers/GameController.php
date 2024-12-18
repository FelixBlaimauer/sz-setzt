<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Goal;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GameController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->cannot('create', Game::class)) {
            abort(403);
        }

        return Redirect::route('admin.index');
    }

    public function destroy(Request $request, Game $game): RedirectResponse
    {
        if ($request->user()->cannot('delete', $game)) {
            abort(403);
        }

        $game->delete();

        return Redirect::route('admin.index');
    }

    public function show(Request $request, Game $game)
    {
        return Inertia::render('Games/Details', [
            'game' => fn() => $game->serializeGame()
        ]);
    }

    public function userGames(Request $request)
    {
        $games = Game::all();

        $displayGames = $games->map(function (Game $game) {
            return $game->serializeGame();
        });


        return Inertia::render('Home', [
            'games' => $displayGames,
        ]);
    }
}

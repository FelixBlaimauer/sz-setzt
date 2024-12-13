<?php

namespace App\Http\Controllers;

use App\Models\Game;
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

    public function userGames(Request $request)
    {
        $games = Game::all();

        $displayGames = $games->map(function (Game $game) {
            return [
                'id' => $game->id,
                'score' => rand(0, 4) . ':' . rand(0, 4),
                'played_at' => $game->played_at->toISOString(),
                'duration' => $game->duration,
                'teams' => $game->teams->map(fn($team) => [
                    'id' => $team->id,
                    'name' => $team->name,
                    'odds' => rand(11, 20) / 10,
                    'goals' => array_map(fn() => [
                        'player' => 'Player ' . rand(1, 11),
                    ], range(0, rand(0, 4))),
                    'stats' => [
                        'wins' => 1,
                        'losses' => 1
                    ]
                ])
            ];
        });


        return Inertia::render('Home', [
            'games' => $displayGames,
        ]);
    }
}

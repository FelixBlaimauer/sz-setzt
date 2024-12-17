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

    private function serializeGame(Game $game)
    {
        return [
            'id' => $game->id,
            'name' => $game->name,
            'played_at' => $game->played_at->toISOString(),
            'duration' => $game->duration,
            'group' => $game->group->name,
            'teams' => $game->teams->map(function(Team $team) use ($game) {
                $goals = $game->goals->where('team_id', $team->id)->values();

                return [
                    'id' => $team->id,
                    'name' => $team->name,
//                    'odds' => rand(11, 20) / 10,
                    'odds' => $game->getTeamOdds($team),
//                    'otto' => $game->gameBets->where('team_id', $team->id)->map(fn($t) => $t->bet)->sum('amount'),
                    'goals' => $goals->map(fn(Goal $goal) => [
                                    'id' => $goal->id,
                                    'player' => $goal->player,
                                    'minute' => $goal->minute,
                                ]) ?? [],
                    'stats' => $team->stats
                ];
            })
        ];
    }

    public function show(Request $request, Game $game)
    {
        return Inertia::render('Games/Details', [
            'game' => fn() => $this->serializeGame($game),
        ]);
    }

    public function userGames(Request $request)
    {
        $games = Game::all();

        $displayGames = $games->map(function (Game $game) {
            return $this->serializeGame($game);
        });


        return Inertia::render('Home', [
            'games' => $displayGames,
        ]);
    }
}

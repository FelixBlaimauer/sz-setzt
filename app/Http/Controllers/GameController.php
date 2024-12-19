<?php

namespace App\Http\Controllers;

use App\Models\Bet;
use App\Models\Game;
use App\Models\Goal;
use App\Models\Team;
use Carbon\Carbon;
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

        \DB::transaction(function () use ($request) {
            $game = Game::create($request->all());

            $teamA = Team::find($request->team_a_id);
            $teamB = Team::find($request->team_b_id);

            $game->teams()->attach([$teamA, $teamB]);
        });

        return Redirect::route('admin.index');
    }

    public function storeGoal(Request $request, Game $game)
    {
        if ($request->user()->cannot('create', Game::class)) {
            abort(403);
        }

        if ($game->started_at === null) {
            return back()->withErrors(['game_id' => 'Game has not started!']);
        }

        $player_id = $request->input('player_id');
        $team_id = $request->input('team_id');
        $min = $request->input('minute');

        $minute = $min === null ? $game->started_at->diffInMinutes(now()) : (int) $min;

        $goal = $game->goals()->create([
            'player_id' => $player_id,
            'team_id' => $team_id,
            'minute' => $minute
        ]);

        return Redirect::route('admin.game', ['game' => $game->id]);
    }

    public function destroy(Request $request, Game $game): RedirectResponse
    {
        if ($request->user()->cannot('delete', $game)) {
            abort(403);
        }

        $game->delete();

        return Redirect::route('admin.index');
    }

    public function start(Request $request, Game $game)
    {
        if ($request->user()->cannot('create', Game::class)) {
            abort(403);
        }

        $game->update([
            'started_at' => Carbon::parse($request->input('started_at')),
        ]);

        return back();
    }

    public function end(Request $request, Game $game)
    {
        if ($request->user()->cannot('create', Game::class)) {
            abort(403);
        }

        $ended_at = Carbon::parse($request->input('ended_at'));

        $game->ended_at = $ended_at;
        $game->save();

        if (now()->gte($ended_at)) {
            $game->distributeBets();
        }

        return back();
    }

    public function show(Request $request, Game $game)
    {
        if (\Auth::check()) {
            $bets = \Auth::user()->bets;

            return Inertia::render('Games/Details', [
                'game' => fn() => $game->serializeGame(),
                'bets' => function () use ($game, $bets) {
                    return $bets->load('bettable')->where('bettable.game_id', $game->id)->values();
                }
            ]);
        }

        return Inertia::render('Games/Details', [
            'game' => fn() => $game->serializeGame(),
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

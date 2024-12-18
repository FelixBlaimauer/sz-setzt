<?php

namespace App\Http\Controllers;

use App\Enums\TournamentStage;
use App\Models\Game;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Groups', [
            'matches' => function () {
                return Game::all()
                    ->where('stage', '!=', TournamentStage::GROUP_STAGE)
                    ->values()
                    ->map(fn(Game $game) => $game->serializeForBracket());
            },
            'groups' => fn() => Group::all()->each(
                fn(Group $group) => $group->teams->append('group_stats')->sortBy([
                    ['group_stats.points', 'desc'],
                    ['group_stats.goalDifference', 'desc'],
                    ['group_stats.goals', 'desc'],
                ])->values()->map(
                    fn($team, $i) => $team->rank = $i + 1
                )
            ),
        ]);
    }
}

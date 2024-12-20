<?php

namespace App\Http\Controllers;

use App\Enums\TournamentStage;
use App\Formatters\MatchFormatter;
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
                $quarters = collect(range(1, 4))->map(fn($i) => MatchFormatter::format(TournamentStage::QUARTER_FINAL, $i));
                $semis = collect(range(1, 2))->map(fn($i) => MatchFormatter::format(TournamentStage::SEMI_FINAL, $i));
                $final = MatchFormatter::format(TournamentStage::GRAND_FINAL, 1);

                $f = Game::where('stage', TournamentStage::GRAND_FINAL);
                if ($f->count() > 0) {
                    $final = MatchFormatter::format(TournamentStage::GRAND_FINAL, null, $f->first());
                }

                $s = Game::where('stage', TournamentStage::SEMI_FINAL);
                $s?->each(function (Game $game, int $i) use (&$semis) {
                    $semis[$i] = MatchFormatter::format(TournamentStage::SEMI_FINAL, null, $game);
                });

                $q = Game::where('stage', TournamentStage::QUARTER_FINAL);
                $q?->each(function (Game $game, int $i) use (&$quarters) {
                    $quarters[$i] = MatchFormatter::format(TournamentStage::QUARTER_FINAL, null, $game);
                });

                $mappedSemis = $semis->map(function ($match) use ($final) {
                    $match['nextMatchId'] = $final['id'];
                    return $match;
                });

                $mappedQuarters = $quarters->map(function ($match, $i) use ($semis) {
                    $match['nextMatchId'] = $semis[intdiv($i, 2)]['id'];
                    return $match;
                });

                return $mappedQuarters->concat($mappedSemis)->concat([$final]);
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

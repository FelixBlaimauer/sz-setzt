<?php

namespace App\Formatters;

use App\Enums\TournamentStage;
use App\Models\Game;
use App\Models\Team;

const stageNames = [
    TournamentStage::QUARTER_FINAL->name => 'Viertelfinale',
    TournamentStage::SEMI_FINAL->name => 'Halbfinale',
    TournamentStage::GRAND_FINAL->name => 'Finale',
];

class MatchFormatter
{
    public static function format(TournamentStage $stage, ?int $id, ?Game $game = null, ?string $nextId = null): array
    {
        if (!$game) {
            return [
                'id' => $stage->name . $id,
                'name' => stageNames[$stage->name] . ' ' . $id,
                'nextMatchId' => null,
                'tournamentRoundText' => stageNames[$stage->name],
                'startTime' => 'TBD',
                'state' => null,
                'participants' => [
                    [
                        'id' => null,
                        'name' => 'TBD',
                        'resultText' => '0',
                        'isWinner' => false,
                        'status' => null,
                    ],
                    [
                        'id' => null,
                        'name' => 'TBD',
                        'resultText' => '0',
                        'isWinner' => false,
                        'status' => null,
                    ]
                ],
            ];
        }

        return [
            'id' => $game->id,
            'name' => $game->name,
            'nextMatchId' => $nextId,
            'tournamentRoundText' => array_search($game->stage, array_column(TournamentStage::cases(), 'name')),
            'startTime' => ($game->started_at ?? $game->planned_at)->format('H:m'),
            'state' => null,
            'participants' => $game->teams->map(function (Team $team) use ($game) {
                $goals = $game->goals->where('team_id', $team->id)->values();
                $winner = $game->winner;

                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'resultText' => '' . $goals->count() ? $goals->count() : '0',
                    'isWinner' => $winner && $winner != 'TIE' && $winner?->id === $team->id,
                    'status' => null,
                ];
            }),
        ];
    }
}

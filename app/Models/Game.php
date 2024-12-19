<?php

namespace App\Models;

use App\Enums\TournamentStage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasUlids;

    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'planned_at',
        'started_at',
        'ended_at',
        'duration',
        'group_id',
        'stage'
    ];

    protected $casts = [
        'planned_at' => 'datetime',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'stage' => TournamentStage::class
    ];

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class);
    }

    public function gameBets(): HasMany
    {
        return $this->hasMany(GameBet::class);
    }

//    This was computed before adding manual ends_at timestamp
//    protected function endsAt(): Attribute {
//        return Attribute::make(
//            get: fn() => $this->planned_at->addMinutes($this->duration)
//        );
//    }

    protected function winner(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->teams->count() !== 2) {
                    return null;
                }
                if ($this->ends_at === null) {
                    return null;
                }

                $team1 = $this->teams->first();
                $team2 = $this->teams->last();

                $team1Goals = $this->goals->where('team_id', $team1->id)->count();
                $team2Goals = $this->goals->where('team_id', $team2->id)->count();

                if ($team1Goals === $team2Goals) {
                    return 'TIE';
                }

                return $team1Goals > $team2Goals ? $team1 : $team2;
            }
        )->shouldCache();
    }

    public function getTeamOdds(Team $team): float
    {
        $bets = $this->gameBets;

        $mySum = $bets->where('team_id', $team->id)->map(fn($bet) => $bet->bet)->sum('amount');
        $otherSum = $bets->where('team_id', '!=', $team->id)->map(fn($bet) => $bet->bet)->sum('amount');

        if ($mySum === 0 || $otherSum === 0) {
            return 1;
        }

        return ($mySum + $otherSum) / ($mySum);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function serializeGame(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'planned_at' => $this->planned_at->toISOString(),
            'started_at' => $this->started_at?->toISOString(),
            'ended_at' => $this->ended_at?->toISOString(),
            'duration' => $this->duration,
            'group' => $this->group?->name,
            'stage' => $this->stage->name,
            'teams' => $this->teams->map(function (Team $team) {
                $goals = $this->goals->where('team_id', $team->id)->values();

                return [
                    'id' => $team->id,
                    'name' => $team->name,
//                    'odds' => rand(11, 20) / 10,
                    'odds' => $this->getTeamOdds($team),
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

    public function serializeForAdmin(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'planned_at' => $this->planned_at->toISOString(),
            'started_at' => $this->started_at?->toISOString(),
            'ended_at' => $this->ended_at?->toISOString(),
            'duration' => $this->duration,
            'group' => $this->group?->name,
            'stage' => $this->stage->name,
            'teams' => $this->teams->map(function (Team $team) {
                $goals = $this->goals->where('team_id', $team->id)->values();

                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'odds' => $this->getTeamOdds($team),
                    'players' => $team->players,
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

    public function serializeForBracket(): array
    {
        $next = null;

        if ($this->stage === TournamentStage::QUARTER_FINAL) {
            $next = TournamentStage::SEMI_FINAL;
        } elseif ($this->stage === TournamentStage::SEMI_FINAL) {
            $next = TournamentStage::GRAND_FINAL;
        } elseif ($this->stage === TournamentStage::LOOSERS_FINAL) {
            $next = TournamentStage::GROUP_STAGE;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'nextMatchId' => $this->stage == TournamentStage::GRAND_FINAL
                ? null
                : static::all()->where('stage', $next)->values()->first()?->id,
            'tournamentRoundText' => array_search($this->stage, array_column(TournamentStage::cases(), 'name')),
            'startTime' => ($this->started_at ?? $this->planned_at)->format('H:m'),
            'state' => null,
            'participants' => $this->teams->map(function (Team $team) {
                $goals = $this->goals->where('team_id', $team->id)->values();
                $winner = $this->winner;

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

<?php

namespace App\Models;

use App\Enums\TournamentStage;
use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasUlids;
    /** @use HasFactory<TeamFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'group_id'
    ];

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }

    public function games(): BelongsToMany
    {
        return $this->belongsToMany(Game::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function gameBets(): HasMany
    {
        return $this->hasMany(GameBet::class);
    }

    protected function stats(): Attribute
    {
        return Attribute::make(
            get: function () {
                $wins = 0;
                $ties = 0;
                $losses = 0;

                $this->games->each(function (Game $game) use (&$wins, &$ties, &$losses) {
                    $winner = $game->winner;

                    if ($winner === null) {
                        return;
                    }

                    // TODO: fix stat calculation
                    if ($winner == 'TIE') {
                        $ties++;
                    } else if ($winner->id === $this->id) {
                        $wins++;
                    } else {
                        $losses++;
                    }
                });

                return [
                    'wins' => $wins,
                    'ties' => $ties,
                    'losses' => $losses,
                ];
            }
        )->shouldCache();
    }

    protected function groupStats(): Attribute
    {
        return Attribute::make(
            get: function() {
                $points = 0;
                $goalsScored = 0;
                $goalsReceived = 0;


                $this->games->where('group_id', $this->group_id)->each(function (Game $game) use (&$points, &$goalsScored, &$goalsReceived) {
                    if ($game->winner === null) {
                        return;
                    }
                    if ($game->winner === 'TIE') {
                        $points++;
                    } else if ($game->winner->id === $this->id) {
                        $points += 3;
                    }

                    $goalsScored += $game->goals->where('team_id', $this->id)->count();
                    $goalsReceived += $game->goals->where('team_id', '!=', $this->id)->count();
                });

                return [
                    'points' => $points,
                    'goalDifference' => $goalsScored - $goalsReceived,
                    'goals' => $goalsScored,
                ];
            }
        )->shouldCache();
    }
}

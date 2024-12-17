<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    Use HasUlids;
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'played_at',
        'duration',
        'group_id',
        'stage'
    ];

    protected $casts = [
        'played_at' => 'datetime'
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

    protected function endsAt(): Attribute {
        return Attribute::make(
            get: fn() => $this->played_at->addMinutes($this->duration)
        );
    }

    protected function winner(): Attribute {
        return Attribute::make(
            get: function () {
                if ($this->teams->count() !== 2) {
                    return null;
                }
                if (now()->isBefore($this->ends_at)) {
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

        if ($mySum + $otherSum === 0) {
            return 1;
        }

        return ($mySum + $otherSum) / ($mySum);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}

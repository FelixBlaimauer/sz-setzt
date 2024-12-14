<?php

namespace App\Models;

use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasUlids;
    /** @use HasFactory<TeamFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
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

    public function stats(): Attribute
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
}

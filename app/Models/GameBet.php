<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class GameBet extends Model
{
    use HasUlids;

    protected $fillable = [
        'game_id',
        'team_id',
    ];

    public function bet(): MorphOne
    {
        return $this->morphOne(Bet::class, 'bettable');
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}

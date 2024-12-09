<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    Use HasUlids;
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'played_at'
    ];

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Player extends Model
{
    use HasUlids;
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = ['name', 'shirt_number'];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }
}

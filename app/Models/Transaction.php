<?php

namespace App\Models;

use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasUlids;
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Transaction $transaction) {
            $transactions = static::all();
            $balance = $transactions->where('user_id', $transaction->user_id)->sum('amount');

            if ($balance + $transaction->amount < 0) {
                throw new \Exception('Insufficient funds: Balance can not be negative');
            }
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'type',
        'user_id'
    ];

    protected $casts = [
        'type' => TransactionType::class
    ];

    protected function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function transaction(): HasOne
    {
        return $this->hasOne(Bet::class);
    }
}

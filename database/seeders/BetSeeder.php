<?php

namespace Database\Seeders;

use App\Enums\BetType;
use App\Enums\TransactionType;
use App\Models\Bet;
use App\Models\Game;
use App\Models\GameBet;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $game = Game::all()->last();
        $admin = User::whereEmail('admin@example.com')->first();

        $gameBet = new GameBet([
            'game_id' => $game->id,
            'team_id' => $game->teams->first()->id,
        ]);

        $gameBet->save();

        $transaction = new Transaction([
            'user_id' => $admin->id,
            'amount' => -100,
            'type' => TransactionType::SPEND,
        ]);

        $transaction->save();

        $gameBet->bet()->create([
            'user_id' => $admin->id,
            'type' => BetType::GAME_BET,
            'bettable_id' => $gameBet->id,
            'amount' => 100,
            'transaction_id' => $transaction->id
        ]);

        $better = User::factory()->create([
            'name' => 'Big better'
        ]);

        Game::all()->each(function(Game $game) use ($better) {
            $gameBet = new GameBet([
                'game_id' => $game->id,
                'team_id' => $game->teams->first()->id,
            ]);

            $gameBet->save();

            $gameBet->bet()->create([
                'user_id' => $better->id,
                'type' => BetType::GAME_BET,
                'bettable_id' => $gameBet->id,
                'amount' => rand(100, 1000),
            ]);

            $gameBet = new GameBet([
                'game_id' => $game->id,
                'team_id' => $game->teams->last()->id,
            ]);

            $gameBet->save();

            $gameBet->bet()->create([
                'user_id' => $better->id,
                'type' => BetType::GAME_BET,
                'bettable_id' => $gameBet->id,
                'amount' => rand(100, 1000),
            ]);
        });
    }
}

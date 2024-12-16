<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Goal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $games = Game::all();

        $games->each(function (Game $game) {
            if (now()->isBefore($game->played_at)) return;

            $goalsA = rand(0, 5);
            $goalsB = rand(0, 5);

            for ($i = 0; $i < $goalsA; $i++) {
                Goal::factory()->create([
                    'team_id' => $game->teams->first()->id,
                    'player_id' => $game->teams->first()->players->random()->id,
                    'game_id' => $game->id
                ]);
            }

            for ($i = 0; $i < $goalsB; $i++) {
                Goal::factory()->create([
                    'team_id' => $game->teams->last()->id,
                    'player_id' => $game->teams->last()->players->random()->id,
                    'game_id' => $game->id
                ]);
            }
        });
    }
}

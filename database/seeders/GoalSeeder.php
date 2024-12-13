<?php

namespace Database\Seeders;

use App\Models\Game;
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

        $games->each(function ($game) {
            $goalsA = random_int(0, 5);
            $goalsB = random_int(0, 5);

            for ($i = 0; $i < $goalsA; $i++) {
                $game->goals()->create([
                    'team_id' => $game->teams->first()->id,
                    'player_id' => $game->teams->first()->players->random()->id,
                ]);
            }

            for ($i = 0; $i < $goalsB; $i++) {
                $game->goals()->create([
                    'team_id' => $game->teams->last()->id,
                    'player_id' => $game->teams->last()->players->random()->id,
                ]);
            }
        });
    }
}

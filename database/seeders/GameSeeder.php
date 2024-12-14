<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = Team::all();
        $games = Game::factory(8)->create();
        $liveGame = Game::factory()->create([
            'played_at' => now(),
        ]);

        $games->each(function ($game) use ($teams) {
            $game->teams()->attach($teams->random(2));
        });

        $liveGame->teams()->attach($teams->random(2));
    }
}

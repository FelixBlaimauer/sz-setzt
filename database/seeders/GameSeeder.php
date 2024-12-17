<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Group;
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
        $games = Group::all()->flatMap(function(Group $group) {
            $teams = $group->teams;

            $games = Game::factory(4)->create([
                'group_id' => $group->id,
            ]);

            $games->each(function(Game $game) use ($teams) {
                $game->teams()->attach($teams->random(2));
            });

            return $games;
        });

        $games->random()->update(['played_at' => now()]);
    }
}

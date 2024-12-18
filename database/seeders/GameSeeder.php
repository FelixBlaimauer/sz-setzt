<?php

namespace Database\Seeders;

use App\Enums\TournamentStage;
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

        $teams = Team::all();

        $quarterFinals = Game::factory(4)->create([
            'name' => 'Quarter Final',
            'stage' => TournamentStage::QUARTER_FINAL,
        ])->each(fn(Game $game) => $game->teams()->attach($teams->random(2)));

        $semiFinals = Game::factory(2)->create([
            'name' => 'Semi Final',
            'stage' => TournamentStage::SEMI_FINAL,
        ])->each(fn(Game $game) => $game->teams()->attach($teams->random(2)));

        $final = Game::factory(1)->create([
            'name' => 'Final',
            'stage' => TournamentStage::GRAND_FINAL,
        ])->each(fn(Game $game) => $game->teams()->attach($teams->random(2)));

        $loosersFinal = Game::factory(1)->create([
            'name' => 'Loosers Final',
            'stage' => TournamentStage::LOOSERS_FINAL,
        ])->each(fn(Game $game) => $game->teams()->attach($teams->random(2)));

        $games->random()->update(['played_at' => now()]);
    }
}

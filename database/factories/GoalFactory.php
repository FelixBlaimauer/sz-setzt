<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Goal>
 */
class GoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'game_id' => fn () => \App\Models\Game::all()->random()->id,
            'team_id' => fn () => \App\Models\Team::all()->random()->id,
            'player_id' => fn () => \App\Models\Player::all()->random()->id,
            'minute' => $this->faker->numberBetween(1, 15),
        ];
    }
}

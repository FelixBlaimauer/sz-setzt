<?php

namespace Database\Factories;

use App\Enums\TournamentStage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'played_at' => $this->faker->dateTimeBetween('-2 days', '+2 days'),
            'duration' => 15,
            'group_id' => 1,
            'stage' => TournamentStage::GROUP_STAGE,
        ];
    }
}

<?php

namespace Database\Factories;

use App\Enums\TournamentStage;
use Carbon\Carbon;
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
        $dateTime = $this->faker->dateTimeBetween('-2 days', '+2 days');
        $end = Carbon::instance($dateTime)->addMinutes(15);
        $now = now();

        return [
            'name' => $this->faker->company(),
            'planned_at' => $dateTime,
            'started_at' => $now->isAfter($dateTime) ? $dateTime : null,
            'ended_at' => $now->isAfter($end) ? $end : null,
            'duration' => 15,
            'group_id' => null,
            'stage' => TournamentStage::GROUP_STAGE,
        ];
    }
}

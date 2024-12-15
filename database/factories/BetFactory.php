<?php

namespace Database\Factories;

use App\Enums\BetType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bet>
 */
class BetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::get();

        return [
            'user_id' => $users->random()->id,
            'amount' => $this->faker->numberBetween(1, 1000),
            'type' => $this->faker->randomElement(array_column(BetType::cases(), 'name')),
        ];
    }
}

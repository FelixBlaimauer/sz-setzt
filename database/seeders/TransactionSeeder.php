<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::get()->first(fn(User $user) => $user->is_admin);

        Transaction::factory()->create([
            'user_id' => $admin->id,
        ]);
    }
}

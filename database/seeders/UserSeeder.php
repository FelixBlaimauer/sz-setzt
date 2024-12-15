<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $adminRole = Role::where('name', 'admin')->first();

        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        $guest = User::factory()->create([
            'name' => 'Guest User',
            'email' => 'guest@example.com'
        ]);

        $admin->roles()->attach($adminRole);
    }
}

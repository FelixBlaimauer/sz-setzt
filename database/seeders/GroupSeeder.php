<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = ['A', 'B', 'C', 'D'];

        foreach ($groups as $group) {
            Group::factory()->create(['name' => $group]);
        }
    }
}

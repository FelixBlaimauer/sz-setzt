<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Group::all()->each(
            fn(Group $group) => Team::factory(4)->create(['group_id' => $group->id])
        );
    }
}

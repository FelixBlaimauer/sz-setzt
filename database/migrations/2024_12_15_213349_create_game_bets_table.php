<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_bets', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('game_id')->constrained('games')->cascadeOnDelete();
            $table->foreignUlid('team_id')->constrained('teams')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_bets');
    }
};

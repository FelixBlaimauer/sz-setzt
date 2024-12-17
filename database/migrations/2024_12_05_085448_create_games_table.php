<?php

use App\Enums\TournamentStage;
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
        Schema::create('games', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->integer('duration'); // in minutes (e.g. 90 for 1.5 hours
            $table->foreignId('group_id')->nullable()->constrained('groups')->cascadeOnDelete();
            $table->enum('stage', array_column(TournamentStage::cases(), 'name'));
            $table->dateTime('played_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};

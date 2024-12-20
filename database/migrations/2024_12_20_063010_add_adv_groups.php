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
        Schema::table('teams', function (Blueprint $table) {
            $table->foreignId('adv_group_id')->nullable()->constrained('groups')->cascadeOnDelete();
        });

        Schema::table('games', function (Blueprint $table) {
            $table->enum('stage', array_column(TournamentStage::cases(), 'name'))->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::table('teams', function (Blueprint $table) {
//            $table->dropColumn('adv_group_id');
//        });
    }
};

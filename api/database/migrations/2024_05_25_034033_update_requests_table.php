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
        Schema::table('requests', function (Blueprint $table) {
            $table->dropForeign(['speaker_id']);
            $table->dropColumn('speaker_id');
            $table->unsignedBigInteger('request_program_id')->nullable();
            $table->foreign('request_program_id')->references('id')->on('request_program')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->unsignedBigInteger('speaker_id');
            $table->foreign('speaker_id')->references('id')->on('users')->onDelete('cascade');
            $table->dropForeign(['request_program_id']);
            $table->dropColumn('request_program_id');
        });
    }
};

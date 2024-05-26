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
        Schema::table('request_program', function (Blueprint $table) {
            $table->unsignedBigInteger('timetable_id')->nullable();
            $table->foreign('timetable_id')->references('id')->on('timetables')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->unsignedBigInteger('timetable_id');
            $table->foreign('timetable_id')->references('id')->on('timetables')->onDelete('cascade');
        });
    }
};

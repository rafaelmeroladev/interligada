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
       Schema::table('banners', function (Blueprint $table) {
            $table->string('text_position')->default('bottom-left')->after('description');
            $table->boolean('show_title')->default(true)->after('text_position');
            $table->boolean('show_description')->default(true)->after('show_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn('text_position');
            $table->dropColumn('show_title');
            $table->dropColumn('show_description');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddImagemToTimetablesTable extends Migration
{
    public function up()
    {
        Schema::table('timetables', function (Blueprint $table) {
            $table->string('imagem')->nullable();
        });
    }

    public function down()
    {
        Schema::table('timetables', function (Blueprint $table) {
            $table->dropColumn('imagem');
        });
    }
}

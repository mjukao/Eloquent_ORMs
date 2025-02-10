<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registers', function (Blueprint $table) {
            $table->id(); // id ของตาราง pivot
            $table->foreignId('student_id')->constrained()->onDelete('cascade'); // foreign key สำหรับ student_id
            $table->foreignId('course_id')->constrained()->onDelete('cascade'); // foreign key สำหรับ course_id
            $table->timestamps(); // สำหรับการติดตามเวลาเมื่อมีการเพิ่มข้อมูล
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registers');
    }
}

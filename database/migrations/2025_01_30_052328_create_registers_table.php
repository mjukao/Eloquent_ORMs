<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * ฟังก์ชันนี้ใช้ในการสร้างตาราง 'registers' ในฐานข้อมูล
     */
    public function up()
    {
        Schema::create('registers', function (Blueprint $table) {
            $table->id(); // id ของตาราง pivot: ใช้เป็นรหัสหลักของตาราง
            $table->foreignId('student_id')->constrained()->onDelete('cascade'); // foreign key สำหรับ student_id: เชื่อมโยงกับตาราง students และเมื่อข้อมูลใน students ถูกลบข้อมูลใน registers จะถูกลบอัตโนมัติ
            $table->foreignId('course_id')->constrained()->onDelete('cascade'); // foreign key สำหรับ course_id: เชื่อมโยงกับตาราง courses และเมื่อข้อมูลใน courses ถูกลบข้อมูลใน registers จะถูกลบอัตโนมัติ
            $table->timestamps(); // สำหรับการติดตามเวลาเมื่อมีการเพิ่มข้อมูล: สร้างคอลัมน์ created_at และ updated_at เพื่อเก็บเวลาที่บันทึกหรืออัพเดตข้อมูล
        });
    }

    /**
     * Reverse the migrations.
     *
     * ฟังก์ชันนี้ใช้ในการลบตาราง 'registers' ออกเมื่อย้อนกลับการทำ migration
     */
    public function down()
    {
        Schema::dropIfExists('registers'); // ลบตาราง registers ออก
    }
}

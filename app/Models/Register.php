<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    use HasFactory;

    // กำหนด $fillable สำหรับการเพิ่มข้อมูล
    protected $fillable = ['student_id', 'course_id'];

    // ความสัมพันธ์กับ Student
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // ความสัมพันธ์กับ Course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}

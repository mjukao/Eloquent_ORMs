<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // กำหนด $fillable สำหรับการเพิ่มข้อมูล
    protected $fillable = ['name', 'email', 'dob'];

    // สร้างความสัมพันธ์ 1 ต่อ หลายกับ Register
    public function registers()
    {
        return $this->hasMany(Register::class);
    }

    // สร้างความสัมพันธ์แบบ Many to Many กับ Course
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'registers', 'student_id', 'course_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // นำเข้า HasFactory
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory; // ใช้ HasFactory ในโมเดลนี้

    protected $fillable = ['name', 'code'];

    // ความสัมพันธ์ Many-to-Many กับ Course
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'registers');
    }
}


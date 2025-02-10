<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;
use App\Models\Register;
use Inertia\Inertia;

class StudentController extends Controller
{
    //  แสดงรายชื่อนักศึกษาทั้งหมด พร้อมข้อมูลรายวิชาที่ลงทะเบียน
    public function index(Request $request)
    {
        // ใช้ Eager Loading โหลดข้อมูลนักศึกษา และรายวิชาที่ลงทะเบียน
        $query = Student::with('registers.course');

        // ตรวจสอบว่ามีการค้นหาชื่อหรือไม่
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $students = $query->get();

        //  จัดการข้อมูลของ courses ให้แน่ใจว่าไม่มีค่า null
        $students->transform(function ($student) {
            // ดึง courses ที่นักศึกษาลงทะเบียน
            $student->courses = $student->registers->map(function ($register) {
                return $register->course;
            })->filter(); // กรองค่า null ออก

            // หากไม่มีรายวิชา ให้ใส่ค่าเริ่มต้น "ยังไม่มีการลงทะเบียน"
            if ($student->courses->isEmpty()) {
                $student->courses = collect([['name' => 'ยังไม่มีการลงทะเบียน', 'code' => '']]);
            }

            return $student;
        });

        // ส่งข้อมูลไปยังหน้าตาราง Student/Index (ใช้ Inertia.js)
        return Inertia::render('Student/Index', ['students' => $students]);
    }

    // แสดงฟอร์มสร้างนักศึกษาใหม่
    public function create()
    {
        // ดึงรายวิชาทั้งหมดเพื่อใช้ใน dropdown
        $courses = Course::all();
        return Inertia::render('Student/Create', ['courses' => $courses]);
    }

    // บันทึกข้อมูลนักศึกษาใหม่
    public function store(Request $request)
    {
        // ตรวจสอบความถูกต้องของข้อมูล
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students|max:255',
            'dob' => 'required|date',
            'course' => 'nullable|exists:courses,id', // วิชาอาจเป็นค่าว่างได้
        ]);

        // บันทึกข้อมูลนักศึกษาใหม่
        $student = Student::create($validated);

        // หากนักศึกษาลงทะเบียนวิชา ให้บันทึกลงในตาราง registers
        if ($request->course) {
            Register::create([
                'student_id' => $student->id,
                'course_id' => $request->course,
            ]);
        }

        return redirect()->route('students.index')->with('message', 'Student created successfully!');
    }

    // แสดงฟอร์มแก้ไขข้อมูลนักศึกษา
    public function edit($id)
    {
        // ค้นหานักศึกษาตาม ID และโหลดรายวิชาทั้งหมด
        $student = Student::findOrFail($id);
        $courses = Course::all();
        return Inertia::render('Student/Edit', [
            'student' => $student,
            'courses' => $courses
        ]);
    }

    //  อัปเดตข้อมูลนักศึกษา
    public function update(Request $request, $id)
    {
        // ตรวจสอบความถูกต้องของข้อมูล
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'dob' => 'required|date',
            'course' => 'nullable|exists:courses,id', // วิชาอาจเป็นค่าว่างได้
        ]);

        // ค้นหานักศึกษาและอัปเดตข้อมูล
        $student = Student::findOrFail($id);
        $student->update($validated);

        // ลบข้อมูลการลงทะเบียนวิชาเดิมออกก่อน
        Register::where('student_id', $id)->delete();

        // หากนักศึกษาลงทะเบียนวิชาใหม่ ให้บันทึกลงตาราง registers
        if ($request->course) {
            Register::create([
                'student_id' => $student->id,
                'course_id' => $request->course,
            ]);
        }

        return redirect()->route('students.index')->with('message', 'Student updated successfully!');
    }

    //  ลบนักศึกษาออกจากระบบ
    public function destroy($id)
    {
        // ค้นหานักศึกษาและลบออกจากฐานข้อมูล
        Student::findOrFail($id)->delete();
        return redirect()->route('students.index')->with('message', 'Student deleted successfully!');
    }
}

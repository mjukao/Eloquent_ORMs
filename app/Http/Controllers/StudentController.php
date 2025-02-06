<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;
use App\Models\Register;
use Inertia\Inertia;

class StudentController extends Controller
{
    // แสดงรายชื่อนักศึกษาทั้งหมด
    public function index(Request $request)
    {
        $query = Student::with('registers.course');

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $students = $query->get();
        return Inertia::render('Student/Index', ['students' => $students]);
    }

    public function create()
    {
        $courses = Course::all();
        return Inertia::render('Student/Create', ['courses' => $courses]);
    }

    // เพิ่มนักศึกษาใหม่
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:students',
            'dateOfBirth' => 'required|date',
            'registeredCourse' => 'required|exists:courses,id',
        ]);

        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'dob' => $request->dateOfBirth,
        ]);

        Register::create([
            'student_id' => $student->id,
            'course_id' => $request->registeredCourse,
        ]);

        return redirect()->route('students.index')->with('message', 'Student created successfully');
    }

    // แสดงรายละเอียดของนักศึกษา
    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    // แก้ไขข้อมูลนักศึกษา
    public function edit($id)
    {
        $student = Student::findOrFail($id);
        return Inertia::render('Student/Edit', ['student' => $student]);
    }

    // อัปเดตข้อมูลนักศึกษา
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->update($request->all());
        return redirect()->route('students.index')->with('message', 'Student updated successfully');
    }

    // ลบนักศึกษา
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return redirect()->route('students.index')->with('message', 'Deleted successfully');
    }

    // ลงทะเบียนนักศึกษาในรายวิชา
    public function registerCourse(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        $register = Register::create($request->all());
        return response()->json($register, 201);
    }

    // แสดงรายวิชาที่นักศึกษาลงทะเบียน
    public function studentCourses($student_id)
    {
        $student = Student::with('registers.course')->findOrFail($student_id);
        return response()->json($student->registers);
    }
}

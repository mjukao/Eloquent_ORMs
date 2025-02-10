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

        // จัดการข้อมูลของ courses ให้ไม่มี null
        $students->transform(function ($student) {
            $student->courses = $student->registers->map(function ($register) {
                return $register->course;
            })->filter();

            if ($student->courses->isEmpty()) {
                $student->courses = collect([['name' => 'ยังไม่มีการลงทะเบียน', 'code' => '']]);
            }

            return $student;
        });

        return Inertia::render('Student/Index', ['students' => $students]);
    }

    public function create()
    {
        $courses = Course::all();
        return Inertia::render('Student/Create', ['courses' => $courses]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students|max:255',
            'dob' => 'required|date',
            'course' => 'nullable|exists:courses,id',
        ]);

        $student = Student::create($validated);

        if ($request->course) {
            Register::create([
                'student_id' => $student->id,
                'course_id' => $request->course,
            ]);
        }

        return redirect()->route('students.index')->with('message', 'Student created successfully!');
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id);
        $courses = Course::all();
        return Inertia::render('Student/Edit', [
            'student' => $student,
            'courses' => $courses
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'dob' => 'required|date',
            'course' => 'nullable|exists:courses,id',
        ]);

        $student = Student::findOrFail($id);
        $student->update($validated);

        Register::where('student_id', $id)->delete();

        if ($request->course) {
            Register::create([
                'student_id' => $student->id,
                'course_id' => $request->course,
            ]);
        }

        return redirect()->route('students.index')->with('message', 'Student updated successfully!');
    }

    public function destroy($id)
    {
        Student::findOrFail($id)->delete();
        return redirect()->route('students.index')->with('message', 'Student deleted successfully!');
    }
}

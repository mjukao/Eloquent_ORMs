import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit({ student = {}, courses = [] }) {
    if (!student || !courses) {
        return <div className="text-center text-red-500 mt-10">❌ เกิดข้อผิดพลาด: ไม่พบข้อมูลนักเรียน</div>;
    }

    const { data, setData, put, processing, errors } = useForm({
        name: student.name || "",
        email: student.email || "",
        dob: student.dob || "",
        course: student.course ? student.course.id : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/students/${student.id}`, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "แก้ไขสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Student" />
            <div className="container mx-auto p-8 bg-gray-900 shadow-lg rounded-lg max-w-2xl mt-10">
                <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">✏️ แก้ไขข้อมูลนักศึกษา</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-300 font-semibold">ชื่อ</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-300 font-semibold">อีเมล</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                        <label className="block text-gray-300 font-semibold">วันเกิด</label>
                        <input
                            type="date"
                            value={data.dob}
                            onChange={(e) => setData("dob", e.target.value)}
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.dob && <div className="text-red-500 text-xs mt-1">{errors.dob}</div>}
                    </div>

                    {/* Course Selection */}
                    <div>
                        <label className="block text-gray-300 font-semibold">รายวิชาที่ลงทะเบียน</label>
                        <select
                            value={data.course}
                            onChange={(e) => setData("course", e.target.value)}
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">ไม่มีการลงทะเบียน</option>
                            {Array.isArray(courses) &&
                                courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name} ({course.code})
                                    </option>
                                ))}
                        </select>
                        {errors.course && <div className="text-red-500 text-xs mt-1">{errors.course}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition duration-200"
                        >
                            💾 บันทึกการแก้ไข
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

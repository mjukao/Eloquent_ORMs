import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create({ courses = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        dob: "",
        course: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/students", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "เพิ่มนักศึกษาสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Student" />
            <div className="container mx-auto p-8 bg-gray-900 shadow-lg rounded-lg max-w-2xl mt-10">
                <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">➕ เพิ่มนักศึกษาใหม่</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-300 font-semibold">ชื่อ</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                            placeholder="กรอกชื่อ"
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
                            placeholder="กรอกอีเมล"
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>

                    {/* Date of Birth */}
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
                            {courses.map((course) => (
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
                            ➕ เพิ่มนักศึกษา
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

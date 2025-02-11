import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create({ courses = [] }) {
    // ใช้ useForm สำหรับจัดการฟอร์มการเพิ่มข้อมูลนักศึกษา
    const { data, setData, post, processing, errors } = useForm({
        name: "", // ชื่อของนักศึกษา
        email: "", // อีเมลของนักศึกษา
        dob: "", // วันเกิดของนักศึกษา
        course: "", // รหัสคอร์สที่นักศึกษาจะลงทะเบียน
    });

    // ฟังก์ชันสำหรับการส่งข้อมูลเมื่อผู้ใช้คลิกปุ่ม 'เพิ่มนักศึกษา'
    const handleSubmit = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อฟอร์มถูกส่ง
        post("/students", {
            onSuccess: () => {
                // แสดง SweetAlert เมื่อการเพิ่มนักศึกษาสำเร็จ
                Swal.fire({
                    icon: "success",
                    title: "เพิ่มนักศึกษาสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500, // ปิดข้อความหลังจาก 1.5 วินาที
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Student" />
            <div className="container mx-auto p-8 bg-gray-900 shadow-lg rounded-lg max-w-2xl mt-10">
                {/* หัวข้อฟอร์มเพิ่มนักศึกษา */}
                <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">➕ เพิ่มนักศึกษาใหม่</h2>

                {/* ฟอร์มการเพิ่มข้อมูลนักศึกษา */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ฟิลด์สำหรับชื่อ */}
                    <div>
                        <label className="block text-gray-300 font-semibold">ชื่อ</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)} // อัปเดตชื่อเมื่อมีการกรอกข้อมูล
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                            placeholder="กรอกชื่อ"
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>} {/* แสดงข้อผิดพลาด */}
                    </div>

                    {/* ฟิลด์สำหรับอีเมล */}
                    <div>
                        <label className="block text-gray-300 font-semibold">อีเมล</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)} // อัปเดตอีเมลเมื่อมีการกรอกข้อมูล
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                            placeholder="กรอกอีเมล"
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>} {/* แสดงข้อผิดพลาด */}
                    </div>

                    {/* ฟิลด์สำหรับวันเกิด */}
                    <div>
                        <label className="block text-gray-300 font-semibold">วันเกิด</label>
                        <input
                            type="date"
                            value={data.dob}
                            onChange={(e) => setData("dob", e.target.value)} // อัปเดตวันเกิดเมื่อมีการกรอกข้อมูล
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.dob && <div className="text-red-500 text-xs mt-1">{errors.dob}</div>} {/* แสดงข้อผิดพลาด */}
                    </div>

                    {/* ฟิลด์สำหรับการเลือกคอร์ส */}
                    <div>
                        <label className="block text-gray-300 font-semibold">รายวิชาที่ลงทะเบียน</label>
                        <select
                            value={data.course}
                            onChange={(e) => setData("course", e.target.value)} // อัปเดตคอร์สเมื่อเลือกจากตัวเลือก
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">ไม่มีการลงทะเบียน</option> {/* ถ้าไม่เลือกคอร์ส */}
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name} ({course.code}) {/* แสดงชื่อและรหัสคอร์ส */}
                                </option>
                            ))}
                        </select>
                        {errors.course && <div className="text-red-500 text-xs mt-1">{errors.course}</div>} {/* แสดงข้อผิดพลาด */}
                    </div>

                    {/* ปุ่มสำหรับบันทึกการเพิ่มนักศึกษา */}
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            disabled={processing} // ปุ่มจะถูกปิดใช้งานเมื่อกำลังประมวลผล
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

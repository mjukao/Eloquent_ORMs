import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from 'sweetalert2';

export default function Index() {
    const { students } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const editStudent = (id) => {
        Inertia.get(`/students/${id}/edit`);
    };

    const deleteStudent = (id) => {
        Swal.fire({
            title: 'คุณต้องการลบนักศึกษานี้?',
            text: "โปรดตรวจสอบให้แน่ใจว่าคุณต้องการลบนักศึกษานี้ออกจากระบบ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6B46C1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบ'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/students/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            'Deleted!',
                            'The student has been deleted.',
                            'success'
                        );
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="รายชื่อนักศึกษา" />
            <div className="container mx-auto p-8 bg-gray-900 shadow-lg rounded-lg mt-8">

                {/* หัวข้อ */}
                <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
                    📋 รายชื่อนักศึกษา
                </h2>

                {/* ช่องค้นหา */}
                <div className="mb-6 flex justify-center">
                    <div className="relative w-2/3">
                        <input
                            type="text"
                            placeholder="🔍 ค้นหาชื่อนักศึกษา..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                        <span className="absolute left-3 top-3 text-gray-400"></span>
                    </div>
                </div>

                {/* ตารางนักศึกษา */}
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="w-full border border-gray-800 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-900 to-purple-600 text-white text-lg text-center">
                                <th className="p-4 text-center w-1/5">ชื่อ</th>
                                <th className="p-4 text-center w-1/5">อีเมล</th>
                                <th className="p-4 text-center w-1/5">วันเกิด</th>
                                <th className="p-4 text-center w-1/5">รายวิชาที่ลงทะเบียน</th>
                                <th className="p-4 text-center w-1/5">แก้ไข / ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <tr key={student.id} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} hover:bg-gray-600 transition text-center`}>
                                        <td className="p-4 text-white font-medium">{student.name}</td>
                                        <td className="p-4 text-gray-300">{student.email}</td>
                                        <td className="p-4 text-purple-300 font-semibold">{student.dob}</td>
                                        <td className="p-4">
                                            {student.registers && student.registers.length > 0 ? (
                                                student.registers.map((register) => (
                                                    <div key={register.id} className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium inline-block">
                                                        {register.course ? `${register.course.name} (${register.course.code})` : "ไม่พบรายวิชา"}
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic font-medium">ยังไม่มีการลงทะเบียน</span>
                                            )}
                                        </td>
                                        <td className="p-4 flex justify-center gap-4">
                                            <button
                                                className="text-purple-400 font-bold hover:underline hover:text-purple-500"
                                                onClick={() => editStudent(student.id)}
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                className={`text-red-400 font-bold hover:underline hover:text-red-500 ${student.unavailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => !student.unavailable && deleteStudent(student.id)}
                                                disabled={student.unavailable}
                                            >
                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-400">ไม่พบนักศึกษาตามคำค้นหา</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

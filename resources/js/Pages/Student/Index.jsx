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
            title: 'Are you sure?',
            text: "You won't be able to revert this",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'delete'


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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    รายชื่อนักศึกษา
                </h2>
            }
        >
            <Head title="รายชื่อนักศึกษา" />
            <div className="container mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
                <input
                    type="text"
                    placeholder="ค้นหานักศึกษา"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border rounded w-full"
                />
                <table className="min-w-full bg-gray-800 text-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-purple-600">
                            <th className="py-3 px-4 text-left">ชื่อ</th>
                            <th className="py-3 px-4 text-left">อีเมล</th>
                            <th className="py-3 px-4 text-left">วันเกิด</th>
                            <th className="py-3 px-4 text-left">รายวิชาที่ลงทะเบียน</th>
                            <th className="py-3 px-4 text-left">แก้ไข/ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="border-b border-gray-600">
                                <td className="py-3 px-4">{student.name}</td>
                                <td className="py-3 px-4">{student.email}</td>
                                <td className="py-3 px-4">{student.dob}</td>
                                <td className="py-3 px-4">
                                    {student.registers && student.registers.length > 0 ? (
                                        student.registers.map((register) => (
                                            <div key={register.id}>
                                                {register.course ? `${register.course.name} (${register.course.code})` : "ไม่พบรายวิชา"}
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">ยังไม่มีการลงทะเบียน</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 hover:underline"
                                        onClick={() => editStudent(student.id)}>
                                        แก้ไข
                                    </button>
                                    <button
                                        className={`text-red-500 hover:text-red-700 hover:underline ml-2 ${student.unavailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => !student.unavailable && deleteStudent(student.id)}
                                        disabled={student.unavailable}
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

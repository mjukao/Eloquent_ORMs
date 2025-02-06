import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from 'sweetalert2';

export default function Edit({ student }) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.name || "",
        email: student.email || "",
        dob: student.dob || "",
        course: student.course || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/students/${student.id}`, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'แก้ไขสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create New Student
                </h2>
            }
        >
            <Head title="Create Student" />
            <div className="container mx-auto p-8 bg-white shadow-md rounded-lg max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Enter full name"
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="Enter your email"
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
                        </div>

                        {/* Date of Birth Field */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dob">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                value={data.dob}
                                onChange={(e) => setData("dob", e.target.value)}
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.dob && <div className="text-red-500 text-xs mt-2">{errors.dob}</div>}
                        </div>


                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            Edit Student
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

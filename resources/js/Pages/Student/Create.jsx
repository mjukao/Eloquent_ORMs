import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from 'sweetalert2';

const CreateStudent = ({ courses }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        dateOfBirth: '',
        registeredCourse: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/students', {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'สร้างสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Create New Student
                </h2>
            }
        >
            <Head title="Create New Student" />
            <div className="container mx-auto p-8 bg-gray-100 shadow-lg rounded-lg max-w-xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={data.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.dateOfBirth && <div className="text-red-500 text-xs mt-2">{errors.dateOfBirth}</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registeredCourse">
                            Registered Course
                        </label>
                        <select
                            id="registeredCourse"
                            name="registeredCourse"
                            value={data.registeredCourse}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        {errors.registeredCourse && <div className="text-red-500 text-xs mt-2">{errors.registeredCourse}</div>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Create Student
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateStudent;

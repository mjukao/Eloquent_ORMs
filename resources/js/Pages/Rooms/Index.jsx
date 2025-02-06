import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { bookings } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900 text-center">
                    📋 รายการการจองที่พัก
                </h2>
            }
        >
            <div className="container mx-auto p-8 bg-gradient-to-r from-gray-100 via-white to-gray-200 shadow-xl rounded-lg">
                <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-300">
                    <thead>
                        <tr className="bg-gradient-to-r from-purple-800 to-purple-600 text-white text-left">
                            <th className="py-4 px-6 font-semibold rounded-tl-lg">ชื่อของลูกค้า</th>
                            <th className="py-4 px-6 font-semibold">หมายเลขโทรศัพท์</th>
                            <th className="py-4 px-6 font-semibold">หมายเลขห้อง</th>
                            <th className="py-4 px-6 font-semibold">สถานะห้อง</th>
                            <th className="py-4 px-6 font-semibold">ประเภทห้อง</th>
                            <th className="py-4 px-6 font-semibold">วันที่เช็คอิน</th>
                            <th className="py-4 px-6 font-semibold rounded-tr-lg">วันที่เช็คเอาท์</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr
                                key={index}
                                className={`border-b ${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-purple-100 transition`}
                            >
                                <td className="py-4 px-6 text-gray-900 font-medium">{booking.customer_name}</td>
                                <td className="py-4 px-6 text-gray-800">{booking.customer_phone}</td>
                                <td className="py-4 px-6 text-gray-800">{booking.room_number}</td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                            booking.room_status === "booked"
                                                ? "bg-red-500"
                                                : booking.room_status === "maintenance"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                    >
                                        {booking.room_status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-gray-800">{booking.room_type}</td>
                                <td className="py-4 px-6 text-gray-800">{booking.check_in_date}</td>
                                <td className="py-4 px-6 text-gray-800">{booking.check_out_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

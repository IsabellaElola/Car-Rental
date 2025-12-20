// src/components/Dashboard.jsx
import React from 'react';
import { dummyBookings } from '../data/cars';

const Dashboard = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Booking History</h2>
            
            {dummyBookings.length === 0 ? (
                <p className="text-gray-500">You have no active or past bookings.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dummyBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.car}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.pickup}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.dropoff}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${booking.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                        `}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
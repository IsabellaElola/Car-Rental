// src/components/UpdatedDashboard.jsx (replace existing Dashboard.jsx)
import React, { useState, useEffect } from 'react';
import { FaCalendar, FaCar, FaMoneyBill, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const Dashboard = ({ userEmail }) => {
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        cancelled: 0,
        totalSpent: 0
    });

    useEffect(() => {
        loadBookings();
        // Refresh bookings every 5 seconds for real-time updates
        const interval = setInterval(loadBookings, 5000);
        return () => clearInterval(interval);
    }, [userEmail]);

    const loadBookings = () => {
        const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const filteredBookings = allBookings.filter(b => b.email === userEmail);
        
        // Sort by most recent first
        filteredBookings.sort((a, b) => new Date(b.bookedAt || b.id) - new Date(a.bookedAt || a.id));
        
        setUserBookings(filteredBookings);

        // Calculate stats
        const total = filteredBookings.length;
        const confirmed = filteredBookings.filter(b => b.status === 'Confirmed').length;
        const pending = filteredBookings.filter(b => b.status === 'Pending').length;
        const cancelled = filteredBookings.filter(b => b.status === 'Cancelled').length;
        const totalSpent = filteredBookings.reduce((sum, booking) => sum + (booking.total || 0), 0);

        setStats({ total, confirmed, pending, cancelled, totalSpent });
        setLoading(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed':
                return <FaCheckCircle className="text-green-500" />;
            case 'Pending':
                return <FaClock className="text-yellow-500" />;
            case 'Cancelled':
                return <FaTimesCircle className="text-red-500" />;
            default:
                return <FaClock className="text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userEmail.split('@')[0]}!</h1>
                <p className="text-blue-100">Here's your booking history and status</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                            <FaCar className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Bookings</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg mr-4">
                            <FaCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Confirmed</p>
                            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                            <FaClock className="text-yellow-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-red-100 rounded-lg mr-4">
                            <FaTimesCircle className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Cancelled</p>
                            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg mr-4">
                            <FaMoneyBill className="text-purple-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Spent</p>
                            <p className="text-2xl font-bold text-purple-600">₱{stats.totalSpent.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Your Booking History</h2>
                    <p className="text-gray-600">All your past and current bookings</p>
                </div>

                {userBookings.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                            <FaCar className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
                        <p className="text-gray-500 mb-4">Start your journey by booking your first car!</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Browse Cars
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Car
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dates
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {userBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                                            <div className="text-sm text-gray-500">
                                                {booking.bookedAt ? formatDate(booking.bookedAt) : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                    <FaCar className="text-gray-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{booking.car}</div>
                                                    <div className="text-sm text-gray-500">{booking.location || 'Pickup Location'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaCalendar className="text-gray-400 mr-2" />
                                                <div>
                                                    <div className="text-sm text-gray-900">{formatDate(booking.pickup)}</div>
                                                    <div className="text-xs text-gray-500">to {formatDate(booking.dropoff)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-lg font-bold text-green-600">
                                                ₱{booking.total?.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(booking.status)}
                                                <span className={`ml-2 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    booking.status === 'Confirmed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : booking.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            {booking.confirmedBy && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Confirmed by: {booking.confirmedBy}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                    If you have questions about your booking status or need to make changes, contact our support team:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold">📞 Phone Support</p>
                        <p className="text-gray-600">(02) 1234-5678</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold">✉️ Email Support</p>
                        <p className="text-gray-600">support@carrental.com</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold">💬 Live Chat</p>
                        <p className="text-gray-600">Available 24/7</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
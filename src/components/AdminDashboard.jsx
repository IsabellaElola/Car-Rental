// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCheck, FaTimes, FaEye, FaUser, FaCar, FaCalendar, FaMoneyBill, FaPhone, FaMapMarker } from 'react-icons/fa';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    totalRevenue: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin');
      return;
    }

    loadBookings();
    // Refresh every 10 seconds for real-time updates
    const interval = setInterval(loadBookings, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);

    // Calculate stats
    const total = storedBookings.length;
    const pending = storedBookings.filter(b => b.status === 'Pending').length;
    const confirmed = storedBookings.filter(b => b.status === 'Confirmed').length;
    const cancelled = storedBookings.filter(b => b.status === 'Cancelled').length;
    const totalRevenue = storedBookings.reduce((sum, booking) => sum + (booking.total || 0), 0);

    setStats({ total, pending, confirmed, cancelled, totalRevenue });

    // Extract unique customers
    const customerMap = new Map();
    storedBookings.forEach(booking => {
      if (!customerMap.has(booking.email)) {
        customerMap.set(booking.email, {
          email: booking.email,
          name: booking.name,
          phone: booking.phone,
          location: booking.location,
          bookings: []
        });
      }
      customerMap.get(booking.email).bookings.push(booking);
    });

    setCustomers(Array.from(customerMap.values()));
  };

  const updateBookingStatus = (id, status) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === id) {
        const updated = { ...booking, status };
        if (status === 'Confirmed') {
          updated.confirmedBy = localStorage.getItem('adminEmail');
          updated.confirmedAt = new Date().toISOString();
        }
        return updated;
      }
      return booking;
    });
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    loadBookings();
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin');
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!localStorage.getItem('adminToken')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage bookings and customers</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, <span className="font-semibold">{localStorage.getItem('adminEmail')}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
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
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <FaCalendar className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FaCheck className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <FaTimes className="text-red-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FaMoneyBill className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">₱{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
                <p className="text-gray-600 text-sm">Manage and update booking status</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Car
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.slice(0, 10).map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.name}</div>
                          <div className="text-sm text-gray-500">{booking.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.car}</div>
                          <div className="text-sm text-gray-500">₱{booking.total?.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewBookingDetails(booking)}
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                            >
                              <FaEye />
                              <span>View</span>
                            </button>
                            {booking.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                  className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                                >
                                  <FaCheck />
                                  <span>Confirm</span>
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                                >
                                  <FaTimes />
                                  <span>Cancel</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {bookings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No bookings found</p>
                </div>
              )}
            </div>
          </div>

          {/* Customers List */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Customers</h2>
                <p className="text-gray-600 text-sm">{customers.length} registered customers</p>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                {customers.map((customer, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <FaPhone className="mr-2" />
                            {customer.phone || 'Not provided'}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FaMapMarker className="mr-2" />
                            {customer.location || 'Not provided'}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {customer.bookings.length} booking{customer.bookings.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {customers.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No customers found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3 text-blue-800">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Name</label>
                      <p className="mt-1 text-gray-900">{selectedBooking.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Email</label>
                      <p className="mt-1 text-gray-900">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Phone</label>
                      <p className="mt-1 text-gray-900">{selectedBooking.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Location</label>
                      <p className="mt-1 text-gray-900">{selectedBooking.location || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Booking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Booking ID</label>
                      <p className="mt-1 text-gray-900">#{selectedBooking.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Car</label>
                      <p className="mt-1 text-gray-900">{selectedBooking.car}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Pickup Date</label>
                      <p className="mt-1 text-gray-900">{formatDate(selectedBooking.pickup)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Dropoff Date</label>
                      <p className="mt-1 text-gray-900">{formatDate(selectedBooking.dropoff)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Total Amount</label>
                      <p className="mt-1 text-2xl font-bold text-green-600">₱{selectedBooking.total?.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Payment Method</label>
                      <p className="mt-1 text-gray-900">{selectedBooking.paymentMethod || 'GCash'}</p>
                    </div>
                  </div>
                </div>

                {/* Status Management */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Status Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Current Status</span>
                        <div className="mt-1">
                          <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                            selectedBooking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : selectedBooking.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateBookingStatus(selectedBooking.id, 'Pending')}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            selectedBooking.status === 'Pending'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => updateBookingStatus(selectedBooking.id, 'Confirmed')}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            selectedBooking.status === 'Confirmed'
                              ? 'bg-green-500 text-white'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateBookingStatus(selectedBooking.id, 'Cancelled')}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            selectedBooking.status === 'Cancelled'
                              ? 'bg-red-500 text-white'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    
                    {selectedBooking.confirmedBy && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Confirmed by: <span className="font-medium">{selectedBooking.confirmedBy}</span>
                        </p>
                        {selectedBooking.confirmedAt && (
                          <p className="text-sm text-gray-600 mt-1">
                            At: {new Date(selectedBooking.confirmedAt).toLocaleString('en-PH')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
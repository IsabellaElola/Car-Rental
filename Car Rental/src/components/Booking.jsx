// src/components/Booking.jsx
import React, { useState } from 'react';

const Booking= ({ isOpen, onClose, car, isLoggedIn }) => {
    const [dates, setDates] = useState({ pickup: '', dropoff: '' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You must be logged in to book a car.');
            return;
        }
        
        // Simple booking logic
        alert(`Booking ${car.name} confirmed from ${dates.pickup} to ${dates.dropoff}!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Book {car?.name}</h2>
                <p className="mb-6 text-lg text-green-600">${car?.price?.toFixed(2)} / day</p>


                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickup">
                                Pickup Date
                            </label>
                            <input
                                id="pickup"
                                type="date"
                                value={dates.pickup}
                                onChange={(e) => setDates({...dates, pickup: e.target.value})}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dropoff">
                                Dropoff Date
                            </label>
                            <input
                                id="dropoff"
                                type="date"
                                value={dates.dropoff}
                                onChange={(e) => setDates({...dates, dropoff: e.target.value})}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
                            disabled={!isLoggedIn}
                        >
                            {isLoggedIn ? 'Confirm Booking' : 'Log In to Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Booking;
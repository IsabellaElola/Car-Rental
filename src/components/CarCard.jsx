// src/components/CarCard.jsx
import React, { useState } from 'react';
import { FaGasPump, FaUsers, FaCog } from 'react-icons/fa';

const CarCard = ({ car, onBookingClick }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleBooking = () => {
        onBookingClick(car);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                    <p className="text-sm text-gray-500">{car.type}</p>
                </div>
                <button onClick={() => setIsFavorite(!isFavorite)} className="text-xl">
                    <span className={isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}>
                        &hearts;
                    </span>
                </button>
            </div>

            <div className="flex justify-center items-center h-32 mb-4 bg-gray-50 rounded-md">
                <img 
                    src={car.imageUrl} 
                    alt={car.name} 
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span className="flex items-center space-x-1">
                    <FaGasPump /><span>{car.fuel}</span>
                </span>
                <span className="flex items-center space-x-1">
                    <FaCog /><span>{car.transmission}</span>
                </span>
                <span className="flex items-center space-x-1">
                    <FaUsers /><span>{car.capacity} People</span>
                </span>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-xl font-bold text-gray-900">
                    ₱{car.price.toFixed(2)}<span className="text-sm font-normal text-gray-500">/ day</span>
                </p>
                <button 
                    onClick={handleBooking}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 font-semibold"
                >
                    Rent Now
                </button>
            </div>
        </div>
    );
};

export default CarCard;




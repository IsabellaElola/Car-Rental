// src/components/CarDetails.jsx
import React from 'react';

const CarDetails = ({ isOpen, onClose, car }) => {
  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
        <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover rounded mb-4" />
        <p><span className="font-semibold">Type:</span> {car.type}</p>
        <p><span className="font-semibold">Seats:</span> {car.seats}</p>
        <p><span className="font-semibold">Price:</span> ₱{car.price?.toLocaleString()} / day</p>
        <p><span className="font-semibold">Features:</span> {car.features ? car.features.join(', ') : 'Air Conditioning, GPS, Radio'}</p>
        <p><span className="font-semibold">Description:</span> {car.description || 'A reliable and comfortable car perfect for city drives and long trips.'}</p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CarDetails;

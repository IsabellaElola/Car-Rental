import React, { useState } from 'react';
import { carsData } from '../data/cars.js';

const HeroSection = ({ onBookingClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const currentCar = carsData[currentIndex];

  const nextCar = () => {
    setCurrentIndex((prev) => 
      prev === carsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevCar = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? carsData.length - 1 : prev - 1
    );
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleBookNow = () => {
    setShowBooking(true);
  };

  const handleBackFromBooking = () => {
    setShowBooking(false);
  };

  const handleBookingConfirmation = () => {
    onBookingClick(currentCar);
    setShowBooking(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      
      {/* Car Display Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Car Image */}
        <div className="h-96 w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-50">
          <img
            src={currentCar.imageUrl}
            alt={currentCar.name}
            className="max-h-full max-w-full object-contain p-8 transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevCar}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-gray-200"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextCar}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-gray-200"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Car Info */}
        <div className="p-8 text-center bg-white">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-bold rounded-full mb-3">
              {currentCar.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{currentCar.name}</h3>
            <p className="text-xl text-gray-600 mb-4">{currentCar.type} • {currentCar.seats} Seats</p>
          </div>
          
          {/* Quick Features */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{currentCar.fuel}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{currentCar.transmission}</span>
            </div>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <p className="text-5xl font-black text-gray-900">
              ₱{currentCar.price.toLocaleString()}
              <span className="text-xl font-medium text-gray-500 ml-2">/day</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button
          onClick={handleShowDetails}
          className="w-full sm:w-auto bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Show Details
        </button>
        
        <button
          onClick={handleBookNow}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Book Now
        </button>
      </div>
      
      {/* Car Indicator Dots */}
      <div className="mt-8 flex justify-center gap-3">
        {carsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-red-600 to-red-700 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
      
      {/* Mobile Swipe Hint */}
      <div className="mt-6 text-center sm:hidden">
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <svg className="w-5 h-5 animate-bounce-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Swipe or tap arrows to navigate</span>
          <svg className="w-5 h-5 animate-bounce-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </p>
      </div>

      {/* Car Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Car Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Content with Expanded Padding */}
            <div className="p-8">
              {/* Car Image and Basic Info */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/2">
                  <img
                    src={currentCar.imageUrl}
                    alt={currentCar.name}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentCar.name}</h3>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {currentCar.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {currentCar.type}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{currentCar.description}</p>
                  <div className="text-4xl font-bold text-gray-900">
                    ₱{currentCar.price.toLocaleString()}<span className="text-lg text-gray-500">/day</span>
                  </div>
                </div>
              </div>
              
              {/* Specifications Grid */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Specifications</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Seats</div>
                    <div className="text-2xl font-bold text-gray-900">{currentCar.seats}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Fuel Type</div>
                    <div className="text-2xl font-bold text-gray-900">{currentCar.fuel}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Transmission</div>
                    <div className="text-2xl font-bold text-gray-900">{currentCar.transmission}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Daily Rate</div>
                    <div className="text-2xl font-bold text-gray-900">₱{currentCar.price}</div>
                  </div>
                </div>
              </div>
              
              {/* Features List */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {currentCar.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    handleBookNow();
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Book This Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal with Back Button */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Booking Confirmation</h2>
                <button
                  onClick={handleBackFromBooking}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Booking Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <img
                  src={currentCar.imageUrl}
                  alt={currentCar.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{currentCar.name}</h3>
                <p className="text-gray-600">{currentCar.type}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">₱{currentCar.price.toLocaleString()}/day</p>
              </div>
              
              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total (2 days)</span>
                  <span className="text-2xl font-bold text-gray-900">₱{(currentCar.price * 2).toLocaleString()}</span>
                </div>
              </div>
              
              {/* Action Buttons - With Back Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBackFromBooking}
                  className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </button>
                <button
                  onClick={handleBookingConfirmation}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Confirm Booking
                </button>
              </div>
              
              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-6">
                By confirming, you agree to our terms and conditions. A confirmation will be sent to your contact number.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
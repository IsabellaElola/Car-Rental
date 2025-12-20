// src/components/Booking.jsx (Updated with phone number restriction and location input)
import React, { useState } from 'react';
import { FaPhone, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard, FaQrcode } from 'react-icons/fa';
import qrgcash from "../images/qrgcash.jpg";


const Booking = ({ isOpen, onClose, car = {}, isLoggedIn, userEmail }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    pickup: '',
    dropoff: ''
  });
  const [error, setError] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showGCashModal, setShowGCashModal] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number - only allow numbers
    if (name === 'phone') {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    if (!isLoggedIn) {
      setError("You must be logged in to book a car.");
      return false;
    }
    
    if (!formData.name || !formData.phone || !formData.location) {
      setError("Please fill in all required fields.");
      return false;
    }
    
    // Validate phone number - only numbers and 10-11 digits
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid Philippine phone number (10-11 digits).");
      return false;
    }
    
    return true;
  };

  const validateDates = () => {
    if (!formData.pickup || !formData.dropoff) {
      setError("Please select pickup and dropoff dates.");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickupDate = new Date(formData.pickup);
    
    if (pickupDate < today) {
      setError("Pickup date cannot be in the past.");
      return false;
    }

    if (new Date(formData.pickup) > new Date(formData.dropoff)) {
      setError("Dropoff must be the same or after pickup date.");
      return false;
    }

    return true;
  };

  const calculateTotal = () => {
    const pickup = new Date(formData.pickup);
    const dropoff = new Date(formData.dropoff);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)) + 1;
    return (car.price || 0) * days;
  };

  const handleNext = () => {
    setError('');
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateDates()) {
        setStep(3);
      }
    }
  };

  const handlePrevious = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!paymentConfirmed) {
      setError("Please confirm that you've made the GCash payment.");
      return;
    }

    const total = calculateTotal();
    const newBooking = {
      id: Date.now(),
      email: userEmail,
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      car: car.name || 'Unknown',
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      total: total,
      status: 'Pending',
      paymentMethod: 'GCash',
      bookedAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    existing.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existing));

    alert(
      `Booking Submitted Successfully!\n\n` +
      `Booking ID: #${newBooking.id}\n` +
      `Car: ${newBooking.car}\n` +
      `Total: ₱${newBooking.total.toLocaleString()}\n` +
      `Status: ${newBooking.status}\n\n` +
      `Admin will confirm your booking within 24 hours.`
    );

    // Reset form
    onClose();
    setStep(1);
    setFormData({ name: '', phone: '', location: '', pickup: '', dropoff: '' });
    setPaymentConfirmed(false);
  };

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Steps */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Book {car?.name || 'Car'}
            </h2>
            <p className="text-gray-600">Complete your booking in 3 simple steps</p>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-3 w-8 rounded-full ${step >= s ? 'bg-blue-600' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Step 1: Customer Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
                <FaUser className="mr-2" />
                Contact Information
              </h3>
              <p className="text-blue-600">We'll use this to contact you about your booking.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 flex items-center">
                  <FaUser className="mr-2 text-gray-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 flex items-center">
                  <FaPhone className="mr-2 text-gray-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="09171234567"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={11}
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    Enter your 10 or 11-digit Philippine number (numbers only)
                  </p>
                  <span className="text-xs text-gray-400">
                    {formData.phone.length}/11
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  Pickup Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pickup address or select from suggestions"
                    required
                  />
                  {/* Location suggestions dropdown */}
                  {!formData.location && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="p-2 text-sm text-gray-500 font-medium">Suggested Locations:</div>
                      <div className="max-h-48 overflow-y-auto">
                        {['Manila', 'Quezon City', 'Makati', 'Taguig', 'Pasig', 'Mandaluyong', 'Parañaque', 'Muntinlupa', 'Las Piñas', 'Marikina'].map((location) => (
                          <button
                            key={location}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, location }))}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter complete address for accurate pickup
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-green-50 p-5 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Select Dates
                  </h3>
                  <p className="text-green-600">Choose your pickup and dropoff dates</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ₱{(car?.price ?? 0).toLocaleString()}<span className="text-sm font-normal text-gray-500">/day</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Pickup Date *</label>
                <input
                  type="date"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Dropoff Date *</label>
                <input
                  type="date"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={handleInputChange}
                  min={formData.pickup || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Price Calculation */}
              <div className="bg-gray-50 p-5 rounded-xl">
                <h4 className="font-bold mb-3 text-gray-800">Price Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate:</span>
                    <span>₱{car.price?.toLocaleString()} × {(total / car.price || 0)} days</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-purple-50 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center">
                <FaCreditCard className="mr-2" />
                Payment Details
              </h3>
              <p className="text-purple-600">Complete your payment via GCash</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Booking Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Car:</span>
                  <span className="font-semibold">{car.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates:</span>
                  <span className="font-semibold">{formData.pickup} to {formData.dropoff}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-green-600">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GCash Payment */}
            <div className="border rounded-xl p-5">
              <h4 className="font-bold mb-4 text-gray-800 flex items-center">
                <FaQrcode className="mr-2" />
                GCash Payment
              </h4>
              
              <div className="bg-gradient-to-br from-blue-500 to-green-500 p-6 rounded-lg mb-4 text-center">
              <div className="inline-block p-6 bg-white/20 rounded-2xl mb-4">
                 <img
                  src={qrgcash}
                  alt="GCash QR Code"
                  className="w-48 h-48 object-contain"
                />  
                </div>

                <p className="text-white font-bold text-lg">Scan QR Code to Pay</p>
                <p className="text-white/90 text-sm mt-1">Open GCash app and scan the QR code</p>
                <p className="text-white text-2xl font-bold mt-3">₱{total.toLocaleString()}</p>
              </div>

              <button
                onClick={() => setShowGCashModal(true)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-green-700 transition mb-4"
              >
                View GCash QR Code
              </button>

              <div className="flex items-start mb-4">
                <input
                  type="checkbox"
                  id="paymentConfirm"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  className="mt-1 mr-3 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="paymentConfirm" className="text-sm">
                  I confirm that I've sent ₱{total.toLocaleString()} via GCash to CAR RENTAL PH (0917 123 4567)
                </label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Your booking will be marked as <span className="font-bold">"Pending"</span> until admin confirms your payment. You'll receive an SMS/email confirmation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition"
            >
              ← Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!paymentConfirmed}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                paymentConfirmed 
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Complete Booking
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Cancel Booking
        </button>
      </div>

      {/* GCash QR Code Modal */}
      {showGCashModal && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-[60] px-4 py-12 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">GCash Payment</h3>
                <button
                  onClick={() => setShowGCashModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-8 rounded-xl mb-6 text-center">
                <div className="inline-block p-6 bg-white/20 rounded-2xl mb-4">
                 <img
                  src={qrgcash}
                  alt="GCash QR Code"
                  className="w-48 h-48 object-contain"
                />  
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">GCash QR</h4>
                <p className="text-white/90">Scan to Pay</p>
                <p className="text-white text-4xl font-bold mt-6">₱{total.toLocaleString()}</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">How to Pay:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Open GCash app</li>
                    <li>Tap "Scan QR"</li>
                    <li>Point camera at QR code</li>
                    <li>Enter amount: <span className="font-bold">₱{total.toLocaleString()}</span></li>
                    <li>Complete payment</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-800">Manual Payment:</p>
                  <p className="text-sm text-blue-700">Send to: <span className="font-bold">09503767918</span></p>
                  <p className="text-sm text-blue-700">Name: <span className="font-bold">CAR RENTAL PH</span></p>
                </div>
              </div>
              
              <button
                onClick={() => setShowGCashModal(false)}
                className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
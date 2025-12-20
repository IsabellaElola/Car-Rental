// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './components/Footer';
import HeroSection from './Components/HeroSection';
import CarListings from './components/CarListings';
import Dashboard from './components/Dashboard';
import Booking from './components/Booking';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('Hero');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

 
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
    setActiveTab('Hero');
  };

  const handleBookingClick = (car) => {
    setSelectedCar(car);
    setShowBooking(true);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/*" element={
            <>
              <Header 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLoginClick={() => setShowLogin(true)}
                onAccountClick={handleLogout}
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
              />
              
              <main className="flex-grow">
                {activeTab === 'Hero' && (
                  <HeroSection onBookingClick={handleBookingClick} />
                )}
                {activeTab === 'Daily Cars' && (
                  <CarListings filter="Daily Cars" onBookingClick={handleBookingClick} />
                )}
                {activeTab === 'Top of the Line' && (
                  <CarListings filter="Top of the Line" onBookingClick={handleBookingClick} />
                )}
                {activeTab === 'Dashboard' && (
                  <Dashboard userEmail={userEmail} />
                )}
              </main>

              <Footer />

              {showLogin && (
                <Login
                  isOpen={showLogin}
                  onClose={() => setShowLogin(false)}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}

              {showBooking && (
                <Booking
                  isOpen={showBooking}
                  onClose={() => setShowBooking(false)}
                  car={selectedCar}
                  isLoggedIn={isLoggedIn}
                  userEmail={userEmail}
                />
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
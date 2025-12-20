import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaHome, FaCar, FaStar, FaTachometerAlt } from 'react-icons/fa';

const Header = ({ activeTab, onTabChange, onLoginClick, onAccountClick, isLoggedIn, userEmail }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { key: 'Hero', label: 'NEW LINE UP', icon: <FaCar /> },
        { key: 'Daily Cars', label: 'DAILY CARS', icon: <FaCar /> },
        { key: 'Top of the Line', label: 'TOP OF THE LINE', icon: <FaStar /> },
        { key: 'Dashboard', label: 'DASHBOARD', icon: <FaTachometerAlt /> },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (tabKey) => {
        onTabChange(tabKey);
        setIsMobileMenuOpen(false); // Close mobile menu after click
    };

    const handleUserAction = () => {
        if (isLoggedIn) {
            onAccountClick();
        } else {
            onLoginClick();
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-gradient-to-r from-gray-900 to-blue-900 shadow-xl sticky top-0 z-50">
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-lg text-white font-bold text-lg sm:text-xl">
                            <span className="hidden sm:inline">RENTAL CARS</span>
                            <span className="sm:hidden">RC</span>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm text-blue-200">Premium Car Rentals</p>
                            <p className="text-xs text-blue-300">Since 2025</p>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-2">
                        {navItems.slice(0, 3).map(item => (
                            <button
                                key={item.key}
                                onClick={() => handleNavClick(item.key)}
                                className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                                    activeTab === item.key 
                                        ? 'bg-blue-600 text-white shadow-lg' 
                                        : 'bg-white/10 text-blue-100 hover:bg-white/20'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                        
                        <button
                            onClick={() => handleNavClick('Dashboard')}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                                activeTab === 'Dashboard' 
                                    ? 'bg-green-600 text-white shadow-lg' 
                                    : 'bg-white/10 text-blue-100 hover:bg-white/20'
                            }`}
                        >
                            <FaTachometerAlt />
                            <span>DASHBOARD</span>
                        </button>
                        
                        {/* User Account Button - Desktop */}
                        <div className="relative group ml-2">
                            <button
                                onClick={handleUserAction}
                                className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                                    isLoggedIn 
                                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg' 
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                                }`}
                            >
                                <FaUser />
                                <span>{isLoggedIn ? 'ACCOUNT' : 'LOGIN'}</span>
                            </button>
                            
                            {/* User Info Dropdown - Desktop */}
                            {isLoggedIn && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FaUser className="text-blue-600" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="font-semibold text-gray-900 truncate">
                                                    {userEmail.split('@')[0]}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <button
                                            onClick={onAccountClick}
                                            className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                                        >
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-2">
                        {/* User Account Button - Mobile */}
                        <button
                            onClick={handleUserAction}
                            className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                                isLoggedIn 
                                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            }`}
                        >
                            <FaUser className="text-sm" />
                            <span className="hidden sm:inline">{isLoggedIn ? 'ACC' : 'LOGIN'}</span>
                        </button>
                        
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg bg-white/10 text-blue-100 hover:bg-white/20 transition"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-gray-800 border-t border-blue-800">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <div className="space-y-2">
                            {navItems.map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => handleNavClick(item.key)}
                                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left rounded-lg transition duration-200 ${
                                        activeTab === item.key 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-white/5 text-blue-100 hover:bg-white/10'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                            
                            {/* User Info - Mobile */}
                            {isLoggedIn && (
                                <div className="mt-4 pt-4 border-t border-blue-700">
                                    <div className="flex items-center space-x-3 px-4 py-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaUser className="text-blue-600" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-white truncate">
                                                {userEmail.split('@')[0]}
                                            </p>
                                            <p className="text-sm text-blue-200 truncate">{userEmail}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onAccountClick}
                                        className="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-300 hover:bg-red-900/20 rounded-lg transition"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Banner */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <p className="text-sm font-semibold text-white text-center">
                        <span className="hidden sm:inline">Admin Access: </span>
                        <a 
                            href="/admin" 
                            className="underline hover:text-yellow-200 font-bold"
                        >
                            Click here for Admin Panel
                        </a>
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
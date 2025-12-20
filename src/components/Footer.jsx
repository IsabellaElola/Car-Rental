// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
                <div className="text-sm">
                    lightning mcqueen @ 2025
                </div>

                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
                    <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
                    <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
                    <a href="#" className="hover:text-gray-400"><FaWhatsapp /></a>
                </div>

                <nav className="flex space-x-4 text-sm mt-2 sm:mt-0">
                    <a href="#" className="hover:text-gray-400">Home</a>
                    <a href="#" className="hover:text-gray-400">Services</a>
                    <a href="#" className="hover:text-gray-400">About</a>
                    <a href="#" className="hover:text-gray-400">Terms</a>
                    <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
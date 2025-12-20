import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Clear form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const saveUser = (email, password) => {
    try {
      const usersData = localStorage.getItem('registeredUsers');
      let users = usersData ? JSON.parse(usersData) : [];
      
      // Check if user already exists
      const userExists = users.some(user => user.email === email);
      
      if (!userExists) {
        users.push({ email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
      
      // Also save in old format for backward compatibility
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      return true;
    } catch (err) {
      console.error("Error saving user:", err);
      return false;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Check all stored users
    let loginSuccessful = false;
    
    // Check in new format
    const usersData = localStorage.getItem('registeredUsers');
    if (usersData) {
      const users = JSON.parse(usersData);
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        loginSuccessful = true;
      }
    }
    
    // Check in old format for backward compatibility
    if (!loginSuccessful) {
      const oldEmail = localStorage.getItem('userEmail');
      const oldPassword = localStorage.getItem('userPassword');
      if (email === oldEmail && password === oldPassword) {
        loginSuccessful = true;
        saveUser(email, password); 
      }
    }

    if (loginSuccessful) {
      onLoginSuccess(email);
      onClose();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(registerEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(registerPassword)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if email already exists
    const usersData = localStorage.getItem('registeredUsers');
    if (usersData) {
      const users = JSON.parse(usersData);
      const userExists = users.some(user => user.email === registerEmail);
      if (userExists) {
        setError("This email is already registered. Please use a different email.");
        return;
      }
    } else {
      // Check old format
      const oldEmail = localStorage.getItem('userEmail');
      if (oldEmail === registerEmail) {
        setError("This email is already registered. Please use a different email.");
        return;
      }
    }

    // Save user
    const saved = saveUser(registerEmail, registerPassword);
    
    if (saved) {
      setError("");
      alert("🎉 Account created successfully! You can now log in.");

      // Switch back to login view and autofill
      setIsLogin(true);
      setEmail(registerEmail);
      setPassword(registerPassword);
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
    } else {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
            <FaUser className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-blue-100 mt-2">
            {isLogin ? "Sign in to your account" : "Join our car rental community"}
          </p>
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <div></div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 font-semibold hover:text-blue-800"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Login
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-bold transition"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}

          <button
            onClick={onClose}
            className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-bold transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
// PasswordReset.jsx

import React, { useState } from "react";
import axios from 'axios';
import LoginImg from "../Assets/login-img.jpg";

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send email, OTP, new password, and confirm password to backend for password reset
      const response = await axios.post('http://localhost:3000/auth/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      const data = response.data;

      if (response.status === 200) {
        // If password reset successful
        setResetSuccess(true);
      } else {
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row max-w-4xl w-full mx-4 lg:mx-auto shadow-violet">
        <div className="lg:w-1/2 lg:order-2">
          <img src={LoginImg} alt="login-dashboard" className="w-full h-auto" />
        </div>
        <div className="lg:w-1/2 p-6 bg-white rounded-md shadow-xl lg:order-1">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase mb-6">
            Reset Password
          </h1>
          {!resetSuccess && (
            <form onSubmit={handleSubmit} className="my-8">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-4 py-2 pr-10 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-800">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="block w-full px-4 py-2 pr-10 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-4">{error}</p>
              )}
            </form>
          )}
          {resetSuccess && (
            <div>
              <p className="text-green-600 text-sm mb-4">Email and OTP verified! Please enter your new password:</p>
              <form onSubmit={handleSubmit} className="my-4">
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="block w-full px-4 py-2 pr-10 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="block w-full px-4 py-2 pr-10 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-4">{error}</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

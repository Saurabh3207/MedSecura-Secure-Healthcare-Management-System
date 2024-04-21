import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginImg from "../Assets/login-img.jpg";
import { toast } from "react-toastify";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const response = await axios.post('http://localhost:3000/auth/reset-password', {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Password reset successful! You can now login with your new password.');
        navigate('/login');
      } else {
        toast.error(response.data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
      
        <form onSubmit={handleSubmit} className="my-8">
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              New Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-3 text-purple-700 bg-white border-l rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  </div>
);
};

export default ResetPassword;

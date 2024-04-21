import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import LoginImg from "../Assets/login-img.jpg";
import BackButton from "../BackButton/BackButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate from useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/auth/forgot-password', { email });
      const { data } = response;

      if (response.status === 200) {
        toast.success('Password reset link sent successfully!');
        navigate("/forgot-password-verification", { state: { email, isForgotPassword: true } });
      } else {
        toast.error(data.error || 'Failed to send password reset OTP.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Failed to send OTP. Please try again later.');
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
          Forgot Password
        </h1>
        <BackButton />
        <form onSubmit={handleSubmit} className="my-8">
          <div className="mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" disabled={loading}>
              {loading ? 'Sending...' : 'Send Password Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};
export default ForgotPassword;

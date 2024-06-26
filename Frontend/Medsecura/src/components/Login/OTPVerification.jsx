import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginImg from "../Assets/login-img.jpg";
import { toast } from "react-toastify";
import BackButton from "../BackButton/BackButton";

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;
  const role = state?.role;
  const isForgotPassword = state?.isForgotPassword || false; // Check if it's for forgot password

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const enteredOtp = otp.join('');
      const url = 'http://localhost:3000/auth/verify-otp'; 
      const response = await axios.post(url, { email, otp: enteredOtp });
      const { data } = response;

      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', role);
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard', { replace: true });
            break;
          case 'receptionist':
            navigate('/receptionist/dashboard', { replace: true });
            break;
          case 'doctor':
            navigate('/doctor/dashboard', { replace: true });
            break;
          case 'patient':
            navigate('/patient/dashboard', { replace: true });
            break;
          default:
            navigate('/', { replace: true });
        }
      } else {
        toast.error(data.error || 'Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Failed to verify OTP. Please try again.');
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
           OTP Verification
          </h1>
          <BackButton />
          <form onSubmit={handleSubmit} className="my-8">
            <div className="flex justify-between items-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-10 h-10 text-3xl text-center border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              ))}
            </div>
            <div className="mb-4">
              {verified ? (
                <p className="text-green-600 text-sm">{isForgotPassword ? 'OTP Verified! Please reset your password.' : 'OTP Verified! Redirecting to dashboard...'}</p>
              ) : (
                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              )}
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

export default OTPVerification;

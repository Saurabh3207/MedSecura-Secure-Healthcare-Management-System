import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import LoginImg from "../Assets/login-img.jpg";
import BackButton from "../BackButton/BackButton";
const ForgotPasswordOTPVerification = ({ setIsOtpVerified }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;

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
      const response = await axios.post('http://localhost:3000/auth/forgot-password-verify-otp', { email, otp: enteredOtp });
      const { data } = response;

      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        setIsOtpVerified(true); // Set isOtpVerified to true
        navigate('/reset-password', { state: { email } });
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
            Forgot Password
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
              <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
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

export default ForgotPasswordOTPVerification;

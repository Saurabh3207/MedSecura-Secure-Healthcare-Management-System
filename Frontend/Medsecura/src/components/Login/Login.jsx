import React, { useState } from "react";
import LoginImg from "../Assets/login-img.jpg";
import Mobotp from "../Assets/otp.png";
import { Checkbox} from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify"; 
import { Link } from 'react-router-dom';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add state for password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get the navigation function

  const toggleVisibility = () => setIsVisible(!isVisible);
  const clearEmail = () => setEmail('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Redirect to OTP verification page after successful login
        navigate('/otp-verification', { state: { email, role: data.role } });
        toast.success('Login successful. Please verify OTP to continue.');
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } 
    catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password.');
      } else if (error.response) {
        
        toast.error('Server error. Please try again later.');
      } else if (error.request) {
    
        toast.error('Internal Server error.');
      } else {
   
        toast.error('Something went wrong. Please try again later.');
      }
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
            Sign in
          </h1>
       
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2 relative">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="block w-full px-4 py-2 pr-10 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && (
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="button"
                    onClick={clearEmail}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
            <div className="mb-2 relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  className="block w-full px-4 py-2 pr-12 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your password"
                  value={password} // Bind password value
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-purple-700 bg-white border-l rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between mb-2">
            <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
    Forgot Password?
  </Link>
              <Checkbox color="secondary" className="text-sm">
                <span>Remember Me</span>
              </Checkbox>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-4">{error}</p>
            )}
          </form>
          <div className="relative flex items-center justify-center mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <div className="flex mt-4 gap-x-2">
            <button
              type="button"
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
            <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
            <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
              <img src={Mobotp} alt="Your image" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

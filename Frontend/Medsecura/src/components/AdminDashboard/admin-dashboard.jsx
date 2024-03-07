// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between p-4">
      {/* Logo or Brand */}
      <div className="text-xl font-semibold">infaERP</div>
      {/* Navigation Links */}
      <div className="space-x-4">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">Doctors</a>
        {/* Add other navigation links here */}
      </div>
      {/* Settings Icon */}
      <i className="fas fa-cog text-xl"></i>
    </nav>
  );
};

export default Navbar;

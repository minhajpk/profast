import React from 'react';
import { Outlet } from 'react-router'; // 
import authImage from '../assets/authImage.png';
import Logo from '../assets/logo.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FAFDF7]">
      
      {/* Left Side - Form Section */}
      <div className="flex flex-col justify-center items-center px-6 md:px-16 py-10 bg-white">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
      <div data-aos="fade-up-left" className="lg:flex justify-center items-center bg-[#FAFDF7] px-8">
        <img 
          src={authImage}
          alt="Courier Illustration"
          className="max-w-xs md:max-w-sm lg:max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Component/Navber';
import Footer from '../Component/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
    duration: 1500,
  
});

const Roots = () => {
    return (
        <div className='bg-gray-100'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Roots;
import React from 'react';
import Logo from '../assets/logo.png'
import { Link } from 'react-router';

const Navber = () => {
    const links = <>
        <li>Services</li>
        <li>Coverage</li>
        <Link to='/about-us'><li>About Us</li></Link>
        <li>Pricing</li>
        <li>Be a Rider</li>
    </>


    return (
        <div className=''>
            <div className="navbar lg:pl-60 lg:pr-60 bg-base-100 shadow-sm ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/'><div className='flex items-end'>
                        <img className='mb-2' src={Logo} alt="" />
                        <p className='text-2xl -ml-2 font-extrabold'>ProFast</p>
                    </div></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end space-x-3 hidden lg:flex  ">
                    <Link to='/login'><button className='btn'>Sign In</button></Link>
                    <Link to='/be-a-rider'><button className='btn bg-[#CAEB66] rounded-xl'>Be a Rider</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Navber;
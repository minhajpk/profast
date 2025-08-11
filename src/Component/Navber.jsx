import React, { use } from 'react';
import Logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router';
import { 
  FaHome, 
  FaMapMarkedAlt, 
  FaPlusSquare, 
  FaMotorcycle, 
  FaInfoCircle, 
  FaTachometerAlt, 
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';
import Icon from '../assets/user.png';


const Navber = () => {

    const links = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "  text-[#03373D]  font-bold bg-[#CAEB66]  " : 
        "text-[#03373D] hover:scale-105 transition duration-300 hover:font-bold hover:bg-[#CAEB66]"} ><li className='m-2 text-xl hover:bg-blue-300'>Home</li></NavLink>
        <NavLink to="/coverage" className={({ isActive }) => isActive ? "  text-[#03373D] font-bold bg-[#CAEB66] "
         : "text-[#03373D] hover:scale-105 transition duration-300 htext-[#03373D]bold hover:bg-[#CAEB66]"} ><li className='m-2 text-xl hover:bg-blue-300'>Coverage</li></NavLink>
        <NavLink to="/add-parcel" className={({ isActive }) => isActive ? "  text-[#03373D] font-bold bg-[#CAEB66] "
         : "text-[#03373D] hover:scale-105 transition duration-300 htext-[#03373D]bold hover:bg-[#CAEB66]"} ><li className='m-2 text-xl hover:bg-blue-300'>Send a Parcel</li></NavLink>
        <NavLink to="/be-a-rider" className={({ isActive }) => isActive ? "  text-[#03373D] font-bold bg-[#CAEB66] " 
        : "text-[#03373D] hover:scale-105 transition duration-300  hover:bg-[#CAEB66]"} ><li className='m-2 text-xl hover:bg-blue-300'>Be a Rider</li></NavLink>
        <NavLink to="/about-us" className={({ isActive }) => isActive ? "  text-[#03373D] font-bold bg-[#CAEB66] " 
        : "text-[#03373D] hover:scale-105 transition duration-300 htext-[#03373D]bold hover:bg-[#CAEB66]"} ><li className='m-2 text-xl hover:bg-blue-300'>About Us</li></NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "  text-[#03373D] font-bold bg-[#CAEB66] " 
        : "text-[#03373D] hover:scale-105 transition duration-300 htext-[#03373D]bold hover:bg-[#CAEB66]"} ><li className='m-2 text-xl hover:bg-blue-300'>Dashboard</li></NavLink>



    </>
    const {user, logOut} = use(AuthContext)

     const handleLogout = () => {
        logOut()
    }


    return (
        <div className=''>
            <div className="navbar lg:pl-60 lg:pr-60 bg-base-100 shadow-sm  ">
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
                <div className="navbar-end space-x-4  lg:flex">
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL || Icon} alt="User" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28">
                                        <li>
                                            <button onClick={handleLogout} className="text-green-800 font-bold">Signout</button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className='space-x-3 hidden lg:flex'>
                                    <Link to="/login" className="btn bg-white text-[#03373D] hover:bg-[#CAEB66]  flex items-center space-x-1">
                                        <FaSignInAlt /> <span>Login</span>
                                    </Link>
                                    <Link to="/register" className="btn bg-[#CAEB66] text-[#03373D] hover:bg-[#CAEB66]  flex items-center space-x-1">
                                        <FaUserPlus /> <span>Sign Up</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                   
                
            </div>
        </div>
    );
};

export default Navber;
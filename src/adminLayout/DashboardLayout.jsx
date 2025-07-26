import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Component/Logo';
import { FaHome, FaBox, FaHistory, FaMapMarkerAlt, FaUserEdit, FaUserClock, FaUserCheck } from 'react-icons/fa';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side bg-blue-100">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <div className='p-3'><Logo></Logo></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome className="inline mr-2" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-Parcels">
                            <FaBox className="inline mr-2" /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/payment-history">
                            <FaHistory className="inline mr-2" /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track-parcel">
                            <FaMapMarkerAlt className="inline mr-2" /> Track Parcel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/update-profile">
                            <FaUserEdit className="inline mr-2" /> Update Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/pending-riders">
                            <FaUserClock className="inline mr-2" /> Manage Riders Request
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/active-riders">
                            <FaUserCheck className="inline mr-2" /> Active Riders
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
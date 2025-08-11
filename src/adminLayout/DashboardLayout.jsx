import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Component/Logo';
import {
  FaHome,
  FaBox,
  FaHistory,
  FaMapMarkerAlt,
  FaUserEdit,
  FaUserClock,
  FaUserCheck,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from 'react-icons/fa';
import { MdAdminPanelSettings, MdPersonAddAlt1 } from 'react-icons/md';
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
        ? "bg-[#CAEB66] text-[#03373D] px-3 py-2 rounded-md block font-bold"
        : "text-gray-700 hover:bg-[#CAEB66] hover:text-[#03373D] px-3 py-2 rounded-md block  ";

  const { role, roleLoading } = useUserRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
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
          <div className="flex-1 px-2 mx-2">Dashboard</div>
        </div>

        <Outlet />
      </div>

      <div className="drawer-side bg-blue-100">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div className="p-3">
            <Logo />
          </div>
          <li>
            <NavLink to="/dashboard">
              <FaHome className="inline-block mr-2 " /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-Parcels" className={navLinkClass}>
              <FaBox className="inline-block mr-2" /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment-history" className={navLinkClass}>
              <FaHistory className="inline-block mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track-parcel"className={navLinkClass}>
              <FaMapMarkerAlt className="inline-block mr-2" /> Track Parcel
            </NavLink>
          </li>

          {!roleLoading && role === 'rider' &&
            <>
              <li>
                <NavLink to="/dashboard/pending-deliveries" className={navLinkClass}>
                  <FaTasks className="inline-block mr-2" /> Pending Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/completed-deliveries" className={navLinkClass}>
                  <FaCheckCircle className="inline-block mr-2" />
                  Completed Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-earnings"className={navLinkClass}>
                  <FaWallet className="inline-block mr-2" />
                  My Earnings
                </NavLink>
              </li>
            </>

          }

          {!roleLoading && role === 'admin' &&
          <>
            <li>
              <NavLink to="/dashboard/pending-riders"className={navLinkClass}>
                <FaUserClock className="inline-block mr-2" /> Manage Riders Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/active-riders"className={navLinkClass}>
                <FaUserCheck className="inline-block mr-2" /> Active Riders
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/make-admin" className={navLinkClass}>
                <MdAdminPanelSettings className="inline-block mr-2" /> Make Admin
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/assign-rider"className={navLinkClass}>
                <MdPersonAddAlt1 className="inline-block mr-2" /> Assign Rider
              </NavLink>
            </li>
          </>
          }        


        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

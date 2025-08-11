import React from 'react';
import {
  createBrowserRouter,

} from "react-router";
import Roots from '../Pages/Roots';
import Home from '../Pages/Home';
import BeARiderForm from '../Pages/BeARiderForm';
import AboutUs from '../Pages/AboutUs';
import AuthLayout from '../AuthLayout/AuthLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import Coverage from '../Pages/Coverage';
import AddParcelForm from '../Pages/AddParcelForm';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../adminLayout/DashboardLayout';
import MyParcels from '../Pages/DashboardPage/MyParcels';
import Payment from '../Pages/DashboardPage/Payment/Payment';
import PaymentHistory from '../Pages/DashboardPage/PaymentHistory';
import Trackparcel from '../Pages/DashboardPage/Trackparcel';
import PendingRiders from '../Pages/DashboardPage/PendingRiders';
import ActiveRiders from '../Pages/DashboardPage/ActiveRiders';
import MakeAdmin from '../Pages/DashboardPage/MakeAdmin';
import Forbidden from '../Pages/Forbidden';
import AdminRoute from './AdminRoute';
import AssignRider from '../Pages/DashboardPage/AssignRider';
import PendingDeliveries from '../Pages/DashboardPage/PendingDeliveries';
import CompletedDeliveries from '../Pages/DashboardPage/CompletedDeliveries';
import MyEarnings from '../Pages/DashboardPage/MyEarnings';
import DashboardHome from '../Pages/DashboardPage/DashboardHome/DashboardHome';
import RiderRoute from './RiderRoute';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/be-a-rider",
         loader: () => fetch("/warehouses.json"),
        element:<PrivateRoute><BeARiderForm></BeARiderForm></PrivateRoute>
      },
      {
        path: "/about-us",
        Component: AboutUs
      },
      {
        path: "/coverage",
        loader: () => fetch("/warehouses.json"),
        Component: Coverage
      },
      {
        path: "/add-parcel",
        loader: () => fetch("/warehouses.json"),
        element:<PrivateRoute><AddParcelForm></AddParcelForm></PrivateRoute>
      },
      {
        path:'/forbidden',
        Component: Forbidden
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: "my-parcels",
        element: <MyParcels />
      },
      {
        path: "payment/:id",
        Component: Payment

      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
      {
        path: "track-parcel",
        Component: Trackparcel
      },
      // admin route
      {
        path:'pending-riders',
       element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path:'active-riders',
        element:<AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
    {
      path: 'make-admin',
      element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
    },
    {
      path:'assign-rider',
      element:<AdminRoute><AssignRider></AssignRider></AdminRoute>
    },
    // rider route
    {
      path:'pending-deliveries',
      element:<RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
    },
    {
      path:'completed-deliveries',
      element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
    },
    {
      path:'my-earnings',
      element:<RiderRoute><MyEarnings></MyEarnings></RiderRoute>
    }
    ]
  }

]);



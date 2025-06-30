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


 export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    children:[
        {
            index: true,
            Component: Home
        },
        {
            path:"/be-a-rider",
            Component: BeARiderForm
        },
        {
            path:"/about-us",
            Component: AboutUs
        },
        {
          path: "/coverage",
          loader: () => fetch("/warehouses.json"),
          Component: Coverage
        },
        {
          path:"/add-parcel",
           loader: () => fetch("/warehouses.json"),
          Component: AddParcelForm
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
        {
            path: 'login',
            Component: Login
        },
        {
            path:'register',
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
      path: "my-parcels",
      element: <MyParcels /> 
    }
  ]
}

]);



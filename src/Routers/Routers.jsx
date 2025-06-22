import React from 'react';
import {
  createBrowserRouter,
 
} from "react-router";
import Roots from '../Pages/Roots';
import Home from '../Pages/Home';
import BeARiderForm from '../Pages/BeARiderForm';
import AboutUs from '../Pages/AboutUs';

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
        }
    ]
  },
]);



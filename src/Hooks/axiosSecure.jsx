import axios from 'axios';
import React from 'react';
const axiosSecures = axios.create({
     baseURL: 'http://localhost:3000',
})

const axiosSecure = () => {
    return axiosSecures
};

export default axiosSecure;
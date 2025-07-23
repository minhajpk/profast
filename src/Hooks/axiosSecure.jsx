import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';


const axiosSecures = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    // const { user } = use(AuthContext);

    // axiosSecures.interceptors.request.use(config => {
    //     config.headers.Authorization = `Bearer ${user.accessToken}`
    //     return config;
    // }, error => {
    //     return Promise.reject(error);
    // })


    return axiosSecures;
};

export default useAxiosSecure;
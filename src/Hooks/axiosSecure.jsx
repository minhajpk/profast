import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';


const axiosSecures = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const { user, logOut } = use(AuthContext);
    const navigate =useNavigate();

    axiosSecures.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecures.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })

    return axiosSecures;
};

export default useAxiosSecure;
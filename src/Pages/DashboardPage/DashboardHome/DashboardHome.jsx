import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../../Forbidden';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;
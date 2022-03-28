import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';

const DashboardView = () => {
    const location = useLocation();

    console.log(location.state.user);
    const userName = location.state.user.name;
    return (
        <>
            <Navbar />
            <h2>Hi {userName}</h2>

        </>
    )
}

export default DashboardView
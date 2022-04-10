import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Link, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';

const DashboardView = () => {
    const history = useHistory();

    // console.log(location.state.user);
    // const userName = location.state.user.name;

    const logout = () => {
        localStorage.clear();
        console.log("I was called");
        history.push('/login'); //redirect to login
    }

    const user = getLocalStorageData('currentUser');

    return (
        <>
            <Navbar />
            <h2>Hi {user.name}</h2>
            <Link href='/profile'>
                Create Profile
            </Link>
            <Link href='/project'>
                Create Project
            </Link>
            <h2>Logout</h2>
            <Button
                variant="contained"
                onClick={() => { logout() }}

            >
                Logout
            </Button>



        </>
    )
}

export default DashboardView
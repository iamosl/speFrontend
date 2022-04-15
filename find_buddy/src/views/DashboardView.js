import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Link, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import './DashboardView.css'
// import { Button } from '@mui/material';

const DashboardView = () => {
    const history = useHistory();

    // console.log(location.state.user);
    // const userName = location.state.user.name;

    const logout = () => {
        localStorage.clear();
        console.log("I was called");
        history.push('/login'); //redirect to login
        window.location.reload(false);
    }

    const user = getLocalStorageData('currentUser');

    return (
        <>
            <div className='Dashboard'>
                <h2>Hi {user.name}</h2>
                <Button className = "Profile" href='/profile' color='primary' variant='contained'>
                    Profile
                </Button>
                <Button className="Portfolio" href='/portfolio' color='primary' variant='contained'>
                    Portfolio
                </Button>
                <h2>Logout</h2>
                <Button
                    variant="contained"
                    onClick={() => { logout() }}

                >
                    Logout
                </Button>
            </div>



        </>
    )
}

export default DashboardView
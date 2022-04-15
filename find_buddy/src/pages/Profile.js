import React from 'react'
import CreateProfileView from '../views/CreateProfileView';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import Navbar from '../components/navbar';
import { Box } from '@mui/system';

const Profile = () => {
    const profile = getLocalStorageData('currentProfile');
    return (
        <div>
            {Object.keys(profile).length === 0 ? <CreateProfileView /> : <CreateProfileView view={true} />}
        </div>
    )
}

export default Profile
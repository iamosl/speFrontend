import React from 'react'
import CreateProfileView from '../views/CreateProfileView';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import Navbar from '../components/navbar';

const Profile = () => {
    const profile = getLocalStorageData('currentProfile');
    return (
        <>
            <Navbar />
            {Object.keys(profile).length === 0 ? <CreateProfileView /> : <CreateProfileView view={true} />}
        </>
    )
}

export default Profile
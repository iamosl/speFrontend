import React from 'react'
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import './Profile.css'
import CreateProfile from '../components/CreateProfile';

const Profile = () => {
    const profile = getLocalStorageData('currentProfile');
    return (
        <div className='Profile'>
            {Object.keys(profile).length === 0 ? <CreateProfile /> : <CreateProfile view={true} />}
        </div>
    )
}

export default Profile
import React from 'react'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom';
import Navbar from '../components/navbar';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';

const Portfolio = () => {

    const history = useHistory();

    const profile = getLocalStorageData('currentProfile');

    const addProject = () => {
        console.log("I was called");
        history.push('/addProject'); //redirect to addProjectPage
    }
    return (
        <>
            <Navbar />
            <div>Portfolio</div>
            {Object.keys(profile).length === 0 ? <h2>Please Create Your Profile First</h2> :
                <Button
                    variant="contained"
                    onClick={() => { addProject() }}
                >
                    Add a new Project
                </Button>}
        </>
    )
}

export default Portfolio
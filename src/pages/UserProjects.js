import React from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import base_url from "../Backend/BackendApi";
import { useState, useEffect } from "react";
import ViewProject from "../components/ViewProject";
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import CreateProject from "../components/CreateProject";
import "./UserProjects.css"

const UserProjects=()=>{

    const [projects,setProjects] = useState([]);
    const profile = getLocalStorageData('currentProfile');
    useEffect(()=>{
        getAllProjects();
    },[])

    const user= getLocalStorageData('currentUser');
    console.log(user);

    const getAllProjects=()=>{
        axios.get(`${base_url}/api/project/userId/${user.id}`).then(
            (response)=>{
                setProjects(response.data);
            },
            (error)=>{
                throw(error);
            }
        )
    }    

    const [open,setOpen] = useState(false);
    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }
    
    return (
        <div className="UserProject">
            <div style={{margin: "50px 0 0 0px"}}>
            {
                Object.keys(profile).length === 0 ? <h1 style={{ margin: "350px 0 0 550px",color:"#FFFFFF"}}>Please create your profile first</h1>
                : (
                    <Container style={{ margin: "100px 0 0 50px", }}>
                        <Button
                            style={{backgroundColor:"#4863A0"}}
                            variant="contained"
                            onClick={handleOpen}>
                            Add a new Project
                        </Button>
                        <CreateProject open={open} onClose={handleClose} />
                        <h2> {console.log(projects)} </h2>
                        <Grid container style={{marginTop:"-50px"}}>
                                {
                                    projects.map((item)=>(
                                        <ViewProject project={item} key={item.name} />
                                    ))
                                }
                        </Grid>
                    </Container>
                )
            }
        </div>
    </div>
    );
}

export default UserProjects;
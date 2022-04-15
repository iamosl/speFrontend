import React from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import base_url from "../Backend/BackendApi";
import { useState, useEffect } from "react";
import ViewProject from "../components/ViewProject";
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import CreateProjectView from "./CreateProjectView";




const AllProjects=()=>{

    const [projects,setProjects] = useState([]);
    useEffect(()=>{
        getAllProjects();
    },[])

    const getAllProjects=()=>{
        axios.get(`${base_url}/api/project`).then(
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
        <Container style={{ margin: "100px 0 0 50px"}}>
            <Button
                variant="contained"
                onClick={handleOpen}>
                Add a new Project
            </Button>
            <CreateProjectView open={open} onClose={handleClose} />
            <h2> {console.log(projects)} </h2>
            <Grid container style={{marginTop:"-50px"}}>
                    {
                        projects.map((item)=>(
                            <ViewProject project={item} key={item.name} />
                        ))
                    }
                </Grid>
        </Container>
    );
}

export default AllProjects;
import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import ProjectDialog from "./ProjectDialog";
import axios from "axios";

import { getLocalStorageData } from "./globalFunctions";
import base_url from "../Backend/BackendApi";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const ViewProject = ({ project }) => {

    const param = useParams();
    const user = getLocalStorageData('currentUser')
    console.log("URLLLLLLLL",param.uname)
    console.log("User:",user.username)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete=()=>{
        axios.delete(`${base_url}/api/project/delete/${project.id}`,{
            headers:{
            'Authorization': getLocalStorageData('token')
            }
        })
            .then(response => {
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }



    return (
        <Grid item xs={12} md={6} lg={4} key={project.name}>
            <Card sx={{ width: "90%", height: "300px", marginBottom: "20px", backgroundColor:"#F5F5F5" }}>
                {
                    (user.username === param.uname) && (<CardActions style={{display:"flex",flexDirection:"row", marginLeft:"60%"}} >
                    <EditIcon style={{ marginLeft: "5%",color:"#151B54",fontSize:"30px",padding:10 }} />
                    <DeleteOutlineIcon style={{ marginLeft: "5%",color:"#151B54",fontSize:"30px",padding:10 }} onClick={handleDelete} />
                    </CardActions>)
                }
                <CardHeader title={project.name} />
                <CardContent >
                    <Typography variant="body1" color="text.secondary">
                        {project.description.substring(0, 300)}
                    </Typography>
                </CardContent>
                <ProjectDialog open={open} handleClose={handleClose} project={project} />
            </Card>
            <Button size="small" variant="contained" onClick={handleOpen} sx={{ marginLeft: "200px", position: "static", marginTop: "-150px",backgroundColor:"#151B54" }}> Learn More</Button>
        </Grid>
    )
}

export default ViewProject;
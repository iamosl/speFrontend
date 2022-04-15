import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import ProjectDialog from "./ProjectDialog";

const ViewProject=({project})=>{

    const [open,setOpen]=useState(false);
    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }
   

    return (
        <Grid item xs={12} md={6} lg={4} key={project.name}>
            <Card sx={{width:"90%", height:"300px",marginBottom: "20px",}}>
                <CardHeader title={project.name} />
                <CardContent >
                    <Typography variant="body2" color="text.secondary">
                        {project.description.substring(0,300)}
                    </Typography>
                </CardContent>      
                <ProjectDialog open={open} handleClose={handleClose} project={project} />
            </Card>
            <Button size="small" onClick={handleOpen} sx={{marginLeft:"200px",position:"static",marginTop:"-150px"}}> Learn More</Button>
        </Grid>
        )
}

export default ViewProject;
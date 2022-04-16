import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import './DashboardContent.css'

const DashboardContent=({post})=>{
    return (
        <Grid lg={12} key={post.title}>
            <Card sx={{width:"60%", height:"100%",marginBottom: "50px",}}>
                <CardHeader title={post.title}  />
                <Grid container>
                {
                    post.skills.map((item)=>(
                        <Grid item key={item.id}>
                        <Fab color="secondary" aria-label={item.id} sx={{fontSize:"15px",marginBottom:"10px",marginLeft:"20px",borderRadius:"5px"}} size="small" variant="extended">
                            {item.skill}
                        </Fab>
                        </Grid>
                ))  // console.log(post.skills)
                }
                </Grid>
                <CardContent >
                    {post.description}
                </CardContent>      
            </Card>
        </Grid>
        )
}

export default DashboardContent;
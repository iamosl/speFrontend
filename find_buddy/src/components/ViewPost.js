import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import PostDialog from "./PostDialog";

const ViewPost=({post})=>{

    const [open,setOpen]=useState(false);
    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }
   

    return (
        <Grid item xs={12} md={6} lg={4} key={post.title}>
            <Card sx={{width:"90%", height:"300px",marginBottom: "20px",}}>
                <CardHeader title={post.title} />
                <CardContent >
                    <Typography variant="body2" color="text.secondary">
                        {post.description.substring(0,300)}
                    </Typography>
                </CardContent>      
                <PostDialog open={open} handleClose={handleClose} post={post} />
            </Card>
            <Button size="small" onClick={handleOpen} sx={{marginLeft:"200px",position:"static",marginTop:"-150px"}}> Learn More</Button>
        </Grid>
        )
}

export default ViewPost;
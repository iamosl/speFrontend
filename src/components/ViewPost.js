import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import PostDialog from "./PostDialog";
import axios from "axios";
import InterestedProfileDialog from "./InterestedProfileDialog";
import RecommendIcon from '@mui/icons-material/Recommend';
import { getLocalStorageData } from "./globalFunctions";
import base_url from "../Backend/BackendApi";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const ViewPost = ({ post }) => {
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

    const [openInterested, setOpenInterested] = useState(false);
    const handleOpenInterested = () => {
        setOpenInterested(true);
    }

    const handleCloseInterested = () => {
        setOpenInterested(false);
    }

    const handleDelete=()=>{
        axios.delete(`${base_url}/api/post/delete/${post.id}`,{
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
        <Grid item lg={6} key={post.title}>
            <Card sx={{ width: "100%", height: "300px", backgroundColor:"#F5F5F5"  }}>
                {
                    (user.username === param.uname) && (<CardActions style={{display:"flex",flexDirection:"row", marginLeft:"75%"}} >
                    <EditIcon style={{ marginLeft: "5%",color:"#151B54",fontSize:"30px",padding:10 }} />
                    <DeleteOutlineIcon style={{ marginLeft: "5%",color:"#151B54",fontSize:"30px",padding:10 }} onClick={handleDelete} />
                    </CardActions>)
                }
                <CardHeader title={post.title}/>
                <CardContent >
                    <Typography variant="body1" color="text.secondary">
                        {post.description.substring(0, 200)+"...."}
                    </Typography>
                </CardContent>
                <PostDialog open={open} handleClose={handleClose} post={post} />
            </Card>
            <InterestedProfileDialog  open={openInterested} handleClose={handleCloseInterested} profiles={post.interestedProfiles}/>
            <CardActions>
            <RecommendIcon onClick={handleOpenInterested} style={{ marginLeft: "5%",marginTop:"-100px",color:"#151B54",fontSize:"40px" }}/>
            <Button size="small" variant="contained" onClick={handleOpen} sx={{ marginLeft: "60%", marginTop: "-100px",backgroundColor:"#151B54",fontSize:"15px",maxWidth:"200px",whiteSpace: "nowrap",paddingLeft:2,paddingRight:2}}>View Post</Button> 
            </CardActions>  
        </Grid>
    )
}

export default ViewPost;
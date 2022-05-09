import React from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import base_url from "../Backend/BackendApi";
import { useState, useEffect } from "react";
import ViewProject from "../components/ViewProject";
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import ViewPost from "../components/ViewPost";
import CreatePost from "../components/CreatePost";
import './UserPosts.css'

const UserPosts=()=>{

    const [posts,setPosts] = useState([]);
    const profile = getLocalStorageData('currentProfile');

    useEffect(()=>{
        getAllPosts();
    },[])

    const user = getLocalStorageData('currentUser');

    const getAllPosts=()=>{
        axios.get(`${base_url}/api/post/userId/${user.id}`).then(
            (response)=>{
                setPosts(response.data);
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
        <div className="UserPost">
            <div style={{margin: "50px 0 0 0px"}}>
        {
            Object.keys(profile).length === 0 ? <h1 style={{ margin: "350px 0 0 550px",color:"#FFFFFF"}}>Please create your profile first</h1>
            : (<Container style={{ margin: "100px 0 0 50px"}}>
                    <Button
                        style={{backgroundColor:"#4863A0"}}
                        variant="contained"
                        onClick={handleOpen}>
                        Add a new Post
                    </Button>
                    <CreatePost open={open} onClose={handleClose} />
                    <h2> {console.log(posts)} </h2>
                    <Grid container style={{marginTop:"-50px"}}>
                        {
                            posts.map((item)=>(
                                <ViewPost post={item} key={item.name} />
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

export default UserPosts;
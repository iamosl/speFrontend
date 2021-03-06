import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import base_url from '../Backend/BackendApi';
import axios from 'axios';
import DashboardContent from '../components/DashboardContent';

import './DashboardView.css'
// import { Button } from '@mui/material';

const DashboardView = () => {
    const history = useHistory();

    const user = getLocalStorageData('currentUser');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getAllPosts();
    }, [])

    useEffect(() => {

    }, [posts]);

    const getAllPosts = () => {
        axios.get(`${base_url}/api/post`,{
            headers:{
              'Authorization': getLocalStorageData('token')
            }
          }).then(
            (response) => {
                setPosts(response.data);
                console.log(posts);
            },
            (error) => {
                throw (error);
            }
        )
    }

    // const temp = {
    //     title: "Heyaaaaaaaaaaaaaaaaa",
    //     description: "sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds fjds sdaf hdsh fsdhf dhsf jkhsdk fsdhj fjds  ",
    //     skills:[]
    // }

    return (
        // <div className='Dashboard' style={{ justifyContent: 'center', height: "100%", width: "100%" }}>
            <Container style={{padding:20}}>
                <Grid container spacing={2}>
                {
                    posts.map((item) => (
                        <DashboardContent post={item} key={item.title} />
                    ))
                }
                </Grid>
            </Container>
        // </div>
    )
}

export default DashboardView
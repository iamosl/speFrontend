import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import './DashboardContent.css'
import base_url from "../Backend/BackendApi";
import { getLocalStorageData } from "./globalFunctions";
import axios from "axios";
import { Button, Link } from "@mui/material";
import { typography } from "@mui/system";

const DashboardContent = ({ post }) => {

    const profile = getLocalStorageData("currentProfile");

    const handleAddInterest = () => {
        axios.post(`${base_url}/api/post/addInterested/${post.id}`, profile, {
            headers: { 
              "Content-Type": "application/json",   
              "Authorization": getLocalStorageData("token")
           },
          })
            .then((response) => {
                console.log(response.status);
            }, (error) => {
                throw (error);
            })
    }

    return (
        <Grid item lg={12} key={post.title}>
            <Card style={{backgroundColor:"#F5F5F5" }}>
                <CardHeader title={post.title} />

                <Grid container>
                    {
                        post.skills.map((item) => (
                            <Grid item key={item.id}>
                                <Fab color="secondary" aria-label={item.id} sx={{ fontSize: "15px", marginBottom: "10px", marginLeft: "20px", borderRadius: "5px" }} size="small" variant="extended">
                                    {item.skill}
                                </Fab>
                            </Grid>
                        ))  // console.log(post.skills)
                    }
                </Grid>
                <CardContent className="subtitle">
                <Link href={`/profile/${post.profile.user.username}`} underline="hover">
                    {/* <typography  variant="body2" color="text.secondary"> */}
                        {"By: " + post.profile.user.username}
                    {/* </typography > */}
                </Link>
                </CardContent>
                <CardContent className="MainBody">
                    <hr/>
                    <typography variant="body2" color="text.secondary">
                    {post.description}
                    </typography>
                </CardContent>
                {
                    (post.profile.id != profile.id && profile.id != null) &&
                        (
                            <Button size="small" variant="contained" onClick={handleAddInterest} sx={{ marginTop:'-5%',marginLeft: "80%", position: "static" }}> Interested</Button>
                        )
                }
                
            </Card>
        </Grid>
    )
}

export default DashboardContent;
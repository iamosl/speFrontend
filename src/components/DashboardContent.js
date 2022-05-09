import { CardHeader } from "@mui/material";
import React, { useState } from "react";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import './DashboardContent.css'
import base_url from "../Backend/BackendApi";
import { getLocalStorageData } from "./globalFunctions";
import axios from "axios";
import { Button } from "@mui/material";
import { typography } from "@mui/system";

const DashboardContent = ({ post }) => {

    const profile = getLocalStorageData("currentProfile");

    const handleAddInterest = () => {
        axios.post(`${base_url}/api/post/addInterested/${post.id}`, profile)
            .then((response) => {
                console.log(response.status);
            }, (error) => {
                throw (error);
            })
    }

    return (
        <Grid lg={12} key={post.title}>
            <Card sx={{ width: "60%", height: "100%", marginBottom: "50px", }}>
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
                    <typography  variant="body2" color="text.secondary">
                        {"By: " + post.id}
                    </typography >
                </CardContent>
                <CardContent className="MainBody">
                    <hr/>
                    <typography variant="body2" color="text.secondary">
                    {post.description}
                    </typography>
                </CardContent>
                <Button size="small" variant="contained" onClick={handleAddInterest} sx={{ marginLeft: "700px", position: "static" }}> Interested</Button>
            </Card>
        </Grid>
    )
}

export default DashboardContent;
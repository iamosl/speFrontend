import React, { useEffect,useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Grid, TextField, Container,Card,CardActions,CardContent,CardHeader,Fab } from "@mui/material";
import { useState } from "react";
import base_url from "../Backend/BackendApi";
import axios from "axios";
import { getLocalStorageData } from "../components/globalFunctions";
import ViewProject from "../components/ViewProject";
import ViewPost from "../components/ViewPost";

const PublicProfile=()=>{
    const param = useParams();
    console.log("Username:   ",param.uname);
    // const profile = useRef({});
    const [profile,setProfile] = useState({});
    
    useEffect(()=>{
        getPublicProfile();
    },[])

    useEffect(()=>{

    },[profile.current])
        

    const getPublicProfile=()=>{
        console.log(`${base_url}/api/profile/public/${param.uname}`);
        axios.get(`${base_url}/api/profile/public/${param.uname}`,{
            headers:{
            'Authorization': getLocalStorageData('token')
            }
        })
            .then(response => {
                console.log(response.data);
                setProfile(response.data);
                // profile.current = response.data;
                console.log("My Profile",profile)
                // if(profile['projectList']==null) [...profile,'projectList':]=
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    return (
        <Container className='PublicProfile' style={{ justifyContent: 'center', height: "100%", width: "100%"}}>
            <h1> User Profile details</h1>
                <Grid container spacing={5}>
                    {
                        Object.keys(profile).filter(function(item){
                            return item!='user' && item!='skills' && item!='id' && item!='projectList' && item!='postList';
                    }).map((field)=>(
                        <Grid item lg={4}>
                        <TextField
                        id={field}
                        label={field.replace(
                            /\w\S*/g,
                            function(txt) {
                              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})}
                        multiline
                        variant="filled"
                        defaultValue={profile[field]}
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{backgroundColor:"white"}}
                        />
                        </Grid>))} 
                        <Grid item lg={12}>

                        </Grid>
                </Grid>
                <Card sx={{ width: "50%", marginBottom: "20px",backgroundColor:"#F5F5F5" }}>
                    <CardHeader title={"Skills"}/>
                    <CardContent >
                    <Grid container>
                        {
                            profile['projectList']!=null && profile['skills'].map((skill)=>(
                                <Grid item key={skill.id}>
                                    <Fab color="secondary" aria-label={skill.id} sx={{fontSize:"15px",marginBottom:"20px",marginInlineEnd:"10px"}} size="medium" variant="extended">
                                        {skill.skill}
                                    </Fab>
                                </Grid>
                            ))
                        }
                    </Grid>
                    </CardContent>
                </Card>
                <Grid container>
                    <Grid item lg={12}>
                        <h2>All Projects</h2>
                    </Grid>
                    {
                        profile['projectList']!=null && profile['projectList'].map((project)=>(
                            <ViewProject project={project} />
                        ))
                        // console.log(profile['projectList'])
                    }
                </Grid>

                <Grid item lg={12}>
                        <h2>All Posts</h2>
                    </Grid>
                <Grid container spacing={10} >

                    {
                        profile['postList']!=null && profile['postList'].map((post)=>(
                            <ViewPost post={post} />
                        ))
                        // console.log(profile['projectList'])
                    }
                </Grid>
                 
        </Container>
    )
}

export default PublicProfile;
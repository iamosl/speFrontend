import React, { Fragment } from 'react'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom';
import Navbar from '../components/navbar';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import './Portfolio.css'
import axios from "axios";
import base_url from "../Backend/BackendApi";
import { useState, useEffect } from "react";
import ViewProject from "../components/ViewProject";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";



const Portfolio = () => {

    const history = useHistory();

    const profile = getLocalStorageData('currentProfile');

    const addProject = () => {
        console.log("I was called");
        history.push('/addProject'); //redirect to addProjectPage
    }

    const viewProjects = ()=>{
        console.log("These are your projects")
        history.push('/viewProjects');
    }


    const [projects,setProjects] = useState([]);
    const custom = {
        name:"Heya",
        description:"hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd hhhhhhhhhhhdffffffffffff fffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffff ffffffffffffffff fffdddddddhhhhhhhhhhhdffffffff ffffffffffffffffffff fffffffffffffff ffffffffffffffffff fffffffffffffff fffffffffffffffffd ddddddhhh hhhhhhh hdfffffffffffff fffffffffffffffffffffffffffff ffffffffffffff fffffffff fffffffffffffff ffffffff fffffdddddddhhhh hhhhhhhdfffffffffffffff ffffffffff ffffffffffff  ffffffffffffffff fffffff fffffffffffffffffffffff ffffffffffdddddddhhhhhhhhhhhdffffffffff fffffffffffffffffffffffffffffffffff fffffffffffffffffff fffffffffffff ffffffffffff ffffddddddd  ",
        skills:[{id:"1", skill:"React"}]
    }
    useEffect(()=>{
        getAllProjects();
    },[])

    const getAllProjects=()=>{
        axios.get(`${base_url}/api/project`).then(
            (response)=>{
                setProjects(response.data);
            },
            (error)=>{
                throw(error);
            }
        )
    }  

    return (
        <div style={{ maxWidth: "95%", justifyContent:'center', margin: "-200px 0 0 650px"}}>
            {
                Object.keys(profile).length === 0 ? <h2>Please Create Your Profile First</h2> :
                <div className="Portfolio" >
                    <Button
                        variant="contained"
                        onClick={() => { addProject()}}>
                        Add a new Project
                    </Button>
                    {/* <Button
                        variant="contained"
                        onClick={() => { viewProjects() }}
                    >
                        View All Projects
                    </Button> */}
                </div>
            }
            <Container style={{ margin: "100px 0 0 50px"}}>
            <h2> {console.log(projects)} </h2>
            <Grid container>
                    {
                        projects.map((item)=>(
                            <ViewProject project={item} />
                        ))
                    }
                    {
                        projects.map((item)=>(
                            <ViewProject project={item} />
                        ))
                    }
                    {
                        <ViewProject project={custom} />
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default Portfolio
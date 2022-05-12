import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Redirect, useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';

import { Avatar, Button, Grid, Link, Paper, TextField, Typography, Snackbar, Alert,Container } from '@mui/material'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import base_url from '../Backend/BackendApi';

const UserLogin = () => {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm()

    //For Toast Notification  (Snackbar)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Please fill the required fields');
    const [success, setSuccess] = useState("warning");
    const token = useRef("");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const changePage = () => {
        console.log("YAAAAAAAAAAAAAAYYYYYYYYYYYYYYYYYY")
        history.push('/dashboard'); //redirect to dashboard
        window.location.reload(false);
    }
    //For API call
    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data);
        await axios
            .post(
                `${base_url}/login`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(async response => {
                // console.log(response.data);
                token.current = response.headers["authorization"];
                await setLocalStorageData('token', token.current);
                console.log("Token",token.current);
                await axios.post(`${base_url}/signIn`,data,{
                        headers:{
                          'Authorization': token.current
                        }
                      })
                    .then(async response => {
                        console.log("Sigining in")
                        setMessage("Login Successful");
                        setSuccess(response.data.status);
                        setLocalStorageData('currentUser', response.data.user);
                        console.log("Sigining innnnn")
                        await axios.get(`${base_url}/api/skill`,{
                            headers:{
                            'Authorization': token.current
                            }
                        })
                            .then(async response => {
                                console.log("Getting SKills")
                                await setLocalStorageData('listOfSkills', response.data);
                            })
                            .catch(error => {
                                console.log(error.response.data);
                            })
                        await axios.get(`${base_url}/api/profile/userId/` + response.data.user.id,{
                            headers:{
                            'Authorization': token.current
                            }
                        })
                            .then(async response => {
                                if (response.data) {
                                    console.log(response.data);
                                    await setLocalStorageData('currentProfile', response.data);
                                }
                                else
                                    await setLocalStorageData('currentProfile', {});

                            })
                            .catch(error => {
                                console.log(error.response.data);
                            })
                        })
                        .catch(error => {
                            console.log(error.response.data);
                        })
                
                changePage();
            })
            .catch(error => {
                console.log(error.response.data);
                setMessage(error.response.data);
                setSuccess("error");

            });
    };


    const fieldStyle = { margin: "8px 0" }
    return (
        <Container >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, height: '50vh', width: 350, margin: "100px auto" }}>
                        <Grid align='center' style={{ margin: "12px 0" }}>
                            <Avatar><LoginOutlinedIcon color="primary" /></Avatar>
                            <h2>Login</h2>
                        </Grid>
                        <TextField
                            id="username"
                            name="username"
                            label='Username'
                            placeholder='Enter your username'
                            fullWidth
                            style={fieldStyle}
                            {...register('username', {
                                required: "Required Field",
                            })}
                            />
                        <TextField
                            id="password"
                            name="password"
                            label='Password'
                            placeholder='Enter your Password'
                            type='password'
                            fullWidth
                            style={fieldStyle}
                            {...register('password', {
                                required: "Required Field"
                            })}
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message : null} />
                        <Button
                            type='submit'
                            variant="contained"
                            style={fieldStyle}
                            fullWidth
                            onClick={handleClick}>
                            Sign In
                        </Button>
                        <Typography style={{ margin: "10px 0", textAlign: "center" }}>
                            Not an existing User?
                            <Link href='/register'>
                                Sign Up
                            </Link>
                        </Typography>
                    </Paper>
                </Grid >
            </form>
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={success} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default UserLogin
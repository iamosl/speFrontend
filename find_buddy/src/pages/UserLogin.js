import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Redirect, useHistory } from 'react-router-dom';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';

import { Avatar, Button, Grid, Link, Paper, TextField, Typography, Snackbar, Alert } from '@mui/material'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import base_url from '../Backend/BackendApi';

const UserLogin = () => {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm()

    //For Toast Notification  (Snackbar)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Please fill the required fields');
    const [success, setSuccess] = useState("warning");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const changePage=()=>{
        console.log("YAAAAAAAAAAAAAAYYYYYYYYYYYYYYYYYY")
        history.push('/dashboard'); //redirect to dashboard
        window.location.reload(false);
    }
    //For API call
    const onSubmit = (data) => {
        console.log(data);
        axios
            .post(
                `${base_url}/api/user/signIn`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => {
                console.log(response.data);
                setMessage("Login Successful");
                setSuccess(response.data.status);
                setLocalStorageData('currentUser', response.data.user);
                axios
                    .get(`${base_url}/api/skill`)
                    .then(response => {
                        setLocalStorageData('listOfSkills', response.data);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    })
                axios
                    .get(`${base_url}/api/profile/userId/` + response.data.user.id)
                    .then(response => {
                        if (response.data){
                            console.log(response.data);
                            setLocalStorageData('currentProfile', response.data);
                        }
                        else
                            setLocalStorageData('currentProfile', {});

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
        <div style={{ maxWidth: "95%", justifyContent:'center', margin: "50px 0 0 550px"}}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, height: '50vh', width: 350, margin: "100px auto" }}>
                        <Grid align='center' style={{ margin: "12px 0" }}>
                            <Avatar><LoginOutlinedIcon color="primary" /></Avatar>
                            <h2>Login</h2>
                        </Grid>
                        <TextField
                            id="email"
                            name="email"
                            label='Email-Id'
                            placeholder='Enter your Email ID'
                            fullWidth
                            style={fieldStyle}
                            {...register('email', {
                                required: "Required Field",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Enter a valid Email Address"
                                }
                            })}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null} />
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
        </div>
    )
}

export default UserLogin
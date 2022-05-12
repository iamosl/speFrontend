import React, { useState } from 'react'

import { useForm } from 'react-hook-form';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography, Snackbar, Alert } from '@mui/material'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import base_url from '../Backend/BackendApi';

const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    //For Toast Notification  (Snackbar)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Please fill the required fields');
    const [success, setSuccess] = useState("warning");
    const history = useHistory();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //For API call
    const onSubmit = (data) => {
        console.log(data);
        axios
            .post(
                `${base_url}/signUp`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => {
                console.log(response.data);
                setMessage(response.data.message);
                setSuccess(response.data.status);
                history.push('/login')
            })
            .catch(error => {
                console.log(error.response.data);
                setMessage(error.response.data);
                setSuccess("error");

            });
        
        register('email',{});
        register('name',{});
        register('password',{});

    };

    const fieldStyle = { margin: "8px 0" }
    return (
        <div style={{ maxWidth: "95%", justifyContent:'center', margin: "50px 0 0 900px"}}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, height: '60vh', width: 350, margin: "100px auto" }}>
                        <Grid align='center' style={{ margin: "12px 0" }}>
                            <Avatar><AppRegistrationOutlinedIcon color="primary" /></Avatar>
                            <h2>Sign Up</h2>
                        </Grid>
                        <TextField
                            id="username"
                            name="username"
                            label='Username'
                            placeholder='Enter your UserName'
                            fullWidth
                            style={fieldStyle}
                            {...register('username', {
                                required: "Required Field"
                            })}
                            />
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
                                required: "Required Field",
                                minLength: {
                                    value: 6,
                                    message: "Password length should be 6 characters atleast "
                                }
                            })}
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message : null} />
                        <Button
                            type='submit'
                            variant="contained"
                            style={fieldStyle}
                            fullWidth
                            onClick={handleClick}>
                            Sign Up
                        </Button>
                        <Typography style={{ margin: "10px 0", textAlign: "center" }}>
                            Already a User?
                            <Link href='/login'>
                                {/* Redirect to Login Page left */}
                                Login
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

export default RegisterUser
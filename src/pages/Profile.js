import React from 'react'
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';
import './Profile.css'
import { Button } from '@mui/material';
import ProfileDialog from '../components/ProfileDialog';
import { Container } from '@mui/material';
import { Grid,TextField } from '@mui/material';

const Profile = () => {
    const profile = getLocalStorageData('currentProfile');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        console.log("Close me!!")
        setOpen(false);
    };

    const handleClickOpen=()=>{
        setOpen(true);
    }
    return (
        <Container className='Profile' style={{ justifyContent: 'center', height: "100%", width: "100%"}}>
            <Button variant="contained" onClick={handleClickOpen} style={{backgroundColor:"#4863A0",marginLeft:"100%"}}>Edit</Button>
            <ProfileDialog open={open} handleClose={handleClose}/>
            <form style={{marginTop:"5%" }}>
                <Grid container spacing={5}>
                    {
                        Object.keys(profile).filter(function(item){
                            return item!='user' && item!='skills' && item!='id';
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
                        }}/>
                        </Grid>))} 
                </Grid>
            </form>
        </Container>
    )
}

export default Profile
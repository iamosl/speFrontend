import React from "react";
import CreateProfile from "./CreateProfile";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

const ProfileDialog=({open,handleClose})=>{
    return (
        <div>
            <Dialog open={open} onClose={handleClose} className='DialogBox' disableEnforceFocus>
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogContent>
                    <CreateProfile open={open} handleClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant="contained">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};


export default ProfileDialog;
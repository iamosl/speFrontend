import React from "react";
import { Dialog, DialogContent, DialogActions, Grid, Fab, Button, DialogTitle } from "@mui/material";
import { useHistory } from "react-router-dom";


const InterestedProfileDialog = ({ open, handleClose, profiles }) => {
    const history = useHistory();
    return (
        <div>
            <Dialog open={open} onClose={handleClose} className='DialogBox' disableEnforceFocus>
                <DialogTitle>Interested People</DialogTitle>
                <DialogContent>
                    <Grid container>
                        {
                            profiles.map((profile) => (
                                <Grid item key={profile.id}>
                                    <Fab color="secondary" aria-label={profile.id} sx={{ fontSize: "10px", marginBottom: "20px", marginInlineEnd: "10px" }} size="small" variant="extended" onClick={() => {
                                        history.push("/profile/" + profile.user.username);
                                        window.location.reload(false);
                                    }}>
                                        {profile.user.username}
                                    </Fab>
                                </Grid>
                            )
                            )
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default InterestedProfileDialog;
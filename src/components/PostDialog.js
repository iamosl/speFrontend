import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Button } from "@mui/material";
import { Link } from "@mui/material";

const PostDialog=(props)=>{
    
    const {open,handleClose,post} = props;

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby={post.title}
            aria-describedby={post.description}
            maxWidth="md">
            <DialogTitle id="scroll-dialog-title">
                <Typography variant="h4" color="text.primary" >
                        {post.title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}>
                    <Grid container>
                        {
                            post.skills.map((item)=>(
                                <Grid item key={item.id}>
                                <Fab color="secondary" aria-label={item.id} sx={{fontSize:"10px",marginBottom:"20px",marginInlineEnd:"10px"}} size="small" variant="extended">
                                    {item.skill}
                                </Fab>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Typography variant="body1" color="text.secondary" style={{fontSize:"20px",marginTop:"10px"}}>
                        {post.description}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostDialog;
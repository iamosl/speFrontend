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

const ProjectDialog=(props)=>{
    
    const {open,handleClose,project} = props;

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
            aria-labelledby={project.name}
            aria-describedby={project.description}
            maxWidth="md">
            <DialogTitle id="scroll-dialog-title">
                <Typography variant="h4" color="text.primary" >
                        {project.name}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}>
                    <Grid container>
                        {
                            project.skills.map((item)=>(
                                <Grid item key={item.id}>
                                <Fab color="secondary" aria-label={item.id} sx={{fontSize:"10px",marginBottom:"20px",marginInlineEnd:"10px"}} size="small" variant="extended">
                                    {item.skill}
                                </Fab>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Link href={project.projectLink} variant="body2" color="primary" style={{fontWeight:"bold"}} target="_blank">{project.projectLink}</Link>
                    <Typography variant="body1" color="text.secondary" style={{fontSize:"20px",marginTop:"10px"}}>
                        {project.description}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectDialog;
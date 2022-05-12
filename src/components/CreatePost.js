import React, { useState } from "react";
import { Grid, Paper, MenuItem, TextField, Button } from "@mui/material";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import {
  setLocalStorageData,
  getLocalStorageData,
} from "./globalFunctions";
import { useHistory } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import base_url from "../Backend/BackendApi";
// import PropTypes from "prop-types";

const CreatePost = (props) => {
  const { open, onClose } = props;
  // console
  const skills = getLocalStorageData("listOfSkills");
  const history = useHistory();
  //TO DO
  const currentProfile = getLocalStorageData("currentProfile");
  const descriptionElementRef = React.useRef(null);
  const user = getLocalStorageData('currentUser');

  const defaultValues = {
    title: "",
    description: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = React.useCallback(
    async (event) => {
      // Prevent form from submitting:
      event.preventDefault();
      let data = {
        ...formValues,
        skills: selectedSkills,
        profile: currentProfile,
      };
      console.log(data);

      try {
        let res = await axios.post(`${base_url}/api/post`, data, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": getLocalStorageData("token")
         },
        });
        console.log(data);
        handleClose();
        history.push("/post/"+user.username);
        window.location.reload(false);
      } catch (e) {
        console.log(e);
      }
    },
    [formValues, selectedSkills, currentProfile]
  );

  return (
    <div
      style={{
        maxWidth: "95%",
        justifyContent: "center",
        margin: "100px 0 0 450px",
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <h2 style={{ marginInlineStart: "100px" }} className="wizard-heading">
          Create Post
        </h2>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <form onSubmit={handleSubmit}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item lg={12}>
                  <TextField
                    id="name"
                    value={formValues.title}
                    onChange={handleInputChange}
                    name="title"
                    required
                    label="Post Title"
                    type="text"
                    style={{ width: 450 }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    id="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    name="description"
                    label="Project Description"
                    type="text"
                    style={{ width: 450 }}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={12}>
                  <Multiselect
                    style={{
                      multiselectContainer: {
                        width: 450,
                        height: 56,
                      },
                    }}
                    options={skills} // Options to display in the dropdown
                    onRemove={(event) => {
                      setSelectedSkills(event);
                      // console.log(selectedSkills)
                    }}
                    onSelect={(event) => {
                      setSelectedSkills(event);
                      // console.log(selectedSkills)
                    }}
                    displayValue="skill" // Property name to display in the dropdown options
                    showCheckbox
                    placeholder="Select Relevant Technologies"
                  />
                </Grid>
                <Grid item lg={12}>
                  <Button type="submit" variant="contained" style={{position:"absolute"}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreatePost;

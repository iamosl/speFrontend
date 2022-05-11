import React, { useEffect, useState } from 'react'
import { Grid, Paper, MenuItem, TextField, Button } from '@mui/material'
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import { setLocalStorageData, getLocalStorageData } from './globalFunctions';
import base_url from '../Backend/BackendApi';


const CreateProfile = ({open,handleClose}) => {

    const skills = getLocalStorageData('listOfSkills');
    // console.log("SKILLS");
    // console.log(skills);
    const currentUser = getLocalStorageData('currentUser');
    const currentProfile = getLocalStorageData('currentProfile');

    const defaultValues = {
        bio: "",
        profession: "",
        expertise: "",
        name: "",
    }

    const [formValues, setFormValues] = useState(defaultValues);

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        setFormValues(currentProfile);
        console.log("Profile Exists");
    }, [])


    const handleSubmit = React.useCallback(
        async (event) => {
            // Prevent form from submitting:
            event.preventDefault();
            let data = { ...formValues, skills: selectedSkills, user: currentUser };
            console.log(data);
            try {
                if(currentProfile['id']==null){
                    console.log("First Time!!!!")
                    await axios.post(
                        `${base_url}/api/profile`,
                        data, {
                            headers: { 
                              "Content-Type": "application/json",
                              "Authorization": getLocalStorageData("token")
                           },
                          });
                }
                else{
                    console.log("Updating Profile!!!!")
                    await axios.put(
                        `${base_url}/api/profile/update`,
                        data, {
                            headers: { 
                              "Content-Type": "application/json",
                              "Authorization": getLocalStorageData("token")
                           },
                        });
                }

                await axios.get(`${base_url}/api/profile/userId/${currentUser.id}`,{
                    headers:{
                      'Authorization': getLocalStorageData('token')
                    }
                  }).then(
                    (response) => {
                        setLocalStorageData('currentProfile', response.data);
                    }
                )
                window.location.reload(false);

            } catch (e) {
                console.log(e);
            }
            handleClose();
        },
        [formValues, selectedSkills, currentUser]
    );


    return (
        // <div style={{ margin: "100px 0 0 450px" }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#FFFFFF", width: "25%", height: "60%", paddingLeft: "40px", borderRadius: "15px" }}>
                <h2 style={{ marginInlineStart: '150px' }} className="wizard-heading">
                    {"Your Profile"}
                </h2>
                <Grid container justifyContent='center' alignItems="center" spacing={2}>
                <Grid item lg={12}>
                    <TextField
                        id="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        name="name"
                        label="Name"
                        required
                        type="text"
                        style={{ width: 450 }}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            id="bio"
                            value={formValues.bio}
                            onChange={handleInputChange}
                            name="bio"
                            label="Bio"
                            type="text"
                            style={{ width: 450 }}
                            multiline
                            rows={4}
                            variant="outlined" />
                    </Grid>
                    <Grid item lg={12}>

                        <TextField
                            id="profession"
                            value={formValues.profession}
                            onChange={handleInputChange}
                            name="profession"
                            label="Profession"
                            type="text"
                            style={{ width: 450 }}
                            select
                            required
                            variant="outlined"
                        >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Working Professional">Working Professional</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item lg={12}>

                        <TextField
                            id="expertise"
                            value={formValues.expertise}
                            onChange={handleInputChange}
                            name="expertise"
                            label="Expertise"
                            required
                            type="text"
                            style={{ width: 450 }}
                            select
                            variant="outlined"
                        >
                            <MenuItem value="Front End Developer">Front End Developer</MenuItem>
                            <MenuItem value="Back End Developer">Back End Developer</MenuItem>
                            <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                        </TextField>
                    </Grid>

                    
                    <Grid item lg={12}>

                        <Multiselect
                            style={{
                                multiselectContainer: {
                                    width: 450,
                                    height: 56,
                                    marginBottom: 10,
                                    paddingBottom: 10
                                }
                            }
                            }
                            multiline
                            selectedValues={currentProfile.skills}
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
                            placeholder="Select all your relevant skills" />
                       
                    </Grid>
                </Grid>
                <Button type='submit' variant="contained">Submit</Button>
            </form>
        // </div>
    )
}

export default CreateProfile
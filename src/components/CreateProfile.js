import React, { useEffect, useState } from 'react'
import { Grid, Paper, MenuItem, TextField, Button } from '@mui/material'
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import { setLocalStorageData, getLocalStorageData } from './globalFunctions';
import base_url from '../Backend/BackendApi';


const CreateProfile = (props) => {

    const skills = getLocalStorageData('listOfSkills');
    console.log("SKILLS");
    console.log(skills);
    const currentUser = getLocalStorageData('currentUser');
    const currentProfile = getLocalStorageData('currentProfile');

    const defaultValues = {
        bio: "",
        profession: "",
        expertise: "",
        experience: "",
    }

    const [formValues, setFormValues] = useState(defaultValues);

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleInputChange = (e) => {
        if (!props.view) {
            const { name, value } = e.target;
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
        else {
            console.log("Sorry");
        }
    };

    useEffect(() => {
        props.view ? setFormValues(currentProfile) : setFormValues(formValues);
        props.view ? console.log("Profile Exists") : setSelectedSkills(selectedSkills);
    }, [props.view])


    const handleSubmit = React.useCallback(
        async (event) => {
            // Prevent form from submitting:
            event.preventDefault();
            let data = { ...formValues, skills: selectedSkills, user: currentUser };
            try {
                let res = await axios.post(
                    `${base_url}/api/profile`,
                    data,
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log(res.data);

                await axios.get(`${base_url}/api/profile/userId/${currentUser.id}`).then(
                    (response) => {
                        setLocalStorageData('currentProfile', response.data);
                    }
                )
                window.location.reload(false);

            } catch (e) {
                console.log(e);
            }
        },
        [formValues, selectedSkills, currentUser]
    );


    return (
        <div style={{ margin: "100px 0 0 450px" }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#FFFFFF", width: "25%", height: "60%", paddingLeft: "40px", borderRadius: "15px", position: "fixed" }}>
                <h2 style={{ marginInlineStart: '150px' }} className="wizard-heading">
                    {props.view ? "Your Profile" : "Create Your Profile"}
                </h2>
                <Grid container justifyContent='center' alignItems="center" spacing={2}>
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

                        <TextField
                            id="experience"
                            value={formValues.experience}
                            onChange={handleInputChange}
                            name="experience"
                            label="Experience"
                            required
                            type="number"
                            style={{ width: 450 }}
                            variant="outlined"
                        />
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
                            selectedValues={props.view ? currentProfile.skills : []}
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
                        {props.view ? <></> :
                            <Button type='submit'
                                variant="contained">
                                Submit
                            </Button>
                        }
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default CreateProfile
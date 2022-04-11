import React, { useState } from 'react'
import { Grid, Paper, MenuItem, TextField, Button } from '@mui/material'
import Navbar from '../components/navbar';
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import { setLocalStorageData, getLocalStorageData } from '../components/globalFunctions';

const CreateProjectView = () => {

    const skills = getLocalStorageData('listOfSkills');

    //TO DO 
    const currentProfile = getLocalStorageData('currentProfile');

    const defaultValues = {
        name: "",
        description: "",
        projectLink: "",
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

    const handleSubmit = React.useCallback(
        async (event) => {
            // Prevent form from submitting:
            event.preventDefault();
            let data = { ...formValues, skills: selectedSkills, profile: currentProfile };
            try {
                let res = await axios.post(
                    "http://localhost:8080/api/project",
                    data,
                    { headers: { 'Content-Type': 'application/json' } }
                );
                console.log(res.data);
            } catch (e) {
                console.log(e);
            }
        },
        [formValues, selectedSkills, currentProfile]
    );

    return (
        <>
            <Navbar />
            <Paper elevation={10} style={{ margin: "5vh 35%", height: "auto", width: "auto" }} className="page-content" >
                <fieldset>
                    <h2 style={{ textAlign: "center", marginTop: "5px" }} className="wizard-heading">
                        Create Project Form
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ maxWidth: "95%", margin: "auto" }}>
                            <Grid
                                container
                                spacing={3}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid item l={12}>
                                    <TextField
                                        id="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        name="name"
                                        label="Project Name"
                                        type="text"
                                        style={{ width: 450 }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item l={12}>
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
                                <Grid item l={12}>
                                    <TextField
                                        id="projectLink"
                                        value={formValues.projectLink}
                                        onChange={handleInputChange}
                                        name="projectLink"
                                        label="Project GitHub Link"
                                        type="text"
                                        style={{ width: 450 }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item l={12}>
                                    <Multiselect
                                        style={{
                                            multiselectContainer: {
                                                width: 450,
                                                height: 56
                                            }
                                        }
                                        }
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
                                        placeholder="Select all your relevant skills"
                                    />
                                </Grid>
                                <Grid item l={12}>
                                    <Button type='submit'
                                        variant="contained"
                                        fullWidth>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </fieldset>

            </Paper>
        </>
    )
}

export default CreateProjectView
import Title from "../../../components/Title.jsx";
import Typography from "@mui/material/Typography";
import {FormControl, MenuItem, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import {useAuth} from "../../../context/AuthContext.jsx";
import Box from "@mui/material/Box";
import axios from "axios";

export default function SkillForm() {

    const {jwtToken, setJwtToken} = useAuth();
    console.log(jwtToken);

    const handleAddSkill = async (ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);

        const body ={
            name: data.get("skillName").toString(),
            description: data.get("description").toString(),
            mastery: data.get("mastery").toString(),
            isSoft: false
        };

        console.log(body);

        const fetch = await axios({
            url: "http://localhost:8080/editor/skill",
            method: 'POST',
            headers: {
                "Authorization": `Bearer {eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjljMmIyYmExOGI2ZTQyYmI1MzRlMSIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3MDE0Mjk5NjMsImV4cCI6MTcwMTUxNjM2M30.c5F05awPkXCGqBBWP4wlvfQlVNyj3CCP5uBBJrjKabU}`
            },
            data : body
        });

        console.log(body);

    }

    return <React.Fragment>
        <Grid item xs={6} lg={6} height={600} backgroundColor={"#FFF"}>
            <Title>My resume</Title>
            <Typography fontSize={16} mb={4}>Add a skill</Typography>
            <Box component={"form"} onSubmit={(ev) => handleAddSkill(ev)}>
                <Grid item>
                    <TextField
                        name="skillName"
                        required
                        fullWidth
                        id="skillName"
                        label="Skill name"
                        autoFocus
                        // {...register('firstName')}
                    />

                </Grid>
                <Grid item >
                    <textarea name={"description"} id={"description"} placeholder={"Describe your skill"} cols={55} rows={5} style={{resize: "none"}}></textarea>
                </Grid>

                <Grid item >
                    <Select name={"mastery"} id={"mastery"} placeholder={"Select level of mastery"} defaultValue={"beginner"}>
                        <MenuItem value={"beginner"}>Beginner</MenuItem>
                        <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                        <MenuItem value={"advanced"}>Advanced</MenuItem>
                    </Select>
                </Grid>
                <Button type={"submit"} variant="contained">Submit </Button>
            </Box>
        </Grid>
    </React.Fragment>
}
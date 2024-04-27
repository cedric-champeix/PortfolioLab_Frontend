import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "../components/Title.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useConfirmation} from "../hooks/useConfirmation.js";
import ImageAction from "../features/resume/components/forms/ImageAction.jsx";
import {useResume} from "../features/resume/hooks/useResume.js";
import TextField from "@mui/material/TextField";
import ExperienceSection from "../features/resume/components/ExperienceSection.jsx";
import SkillSection from "../features/resume/components/SkillSection.jsx";
import ContactSection from "../features/resume/components/ContactSection.jsx";
import FormationSection from "../features/resume/components/FormationSection.jsx";
import HobbySection from "../features/resume/components/HobbySection.jsx";
import LanguageSection from "../features/resume/components/LanguageSection.jsx";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";

export default function Resume() {

    //Using skills data
    const {resumeData, setResumeData, updateResumeTitle, updateResumeDescription, resetResume} = useResume()

    //Confirmaton : safeguard hook
    const confirm = useConfirmation();

    //Just clear all the other hook's data
    const resetResumeSafeguard = () => {
        confirm({
            catchOnCancel: true,
            name: "Resume"
        }).then(() => {
            resetResume().then(() => {
                setDescriptionValue("")
            })
            console.log("Reset resume")
        })
    }

    //Is the description in edit mode ?
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    //Is the title in edit mode ?
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const [descriptionValue, setDescriptionValue] = useState("")
    const [titleValue, setTitleValue] = useState("")


    //Description updates when resume data updates
    useEffect(() => {
        setDescriptionValue(resumeData.description)
        setTitleValue(resumeData.title)
        //dispatch("MOUNT_ACTION", "preview resume")
        //dispatch("MOUNT_ACTION", "clear resume")

    }, [resumeData]);

    const handleEditClickDescription = () => {
        setIsEditingDescription(true);
    };
    const handleEditClickTitle = () => {
        setIsEditingTitle(true);
    };

    const handleSaveClickDescription = () => {
        setIsEditingDescription(false);
        updateResumeDescription(descriptionValue).then((data) => {
            setResumeData({
                resumeId: data.id,
                description: data.description,
                title: data.title,
                Image: data.Image
            })
            console.log("UPDATED RESUME DESCRIPTION", data)
        })
    };

    const handleSaveClickTitle = () => {
        setIsEditingTitle(false);
        updateResumeTitle(titleValue).then((data) => {
            setResumeData({
                resumeId: data.id,
                description: data.description,
                title: data.title,
                Image: data.Image
            })
            console.log("UPDATED RESUME TITLE", data)
        })
    };

    const handleCancelClickDescription = (e) => {
        setIsEditingDescription(false);
        setDescriptionValue(e.target.value)
    };

    const handleCancelClickTitle = (e) => {
        setIsEditingTitle(false);
        setTitleValue(e.target.value)
    };


    return <Paper elevation={12} sx={{width: '100%', maxWidth: 1400, margin: 'auto'}}>
        <Grid container sx={{p: 3}} style={{backgroundColor: "#FFF", borderRadius: "8px", padding: "20px"}}>
            <Grid container marginY="10px">
                <Grid item xs={12} md={4} lg={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <ImageAction resumeData={resumeData}/>
                </Grid>
                <Grid item xs={12} md={8} lg={9} padding="5px">
                    <Title>Job title</Title>
                    {
                        isEditingTitle ?
                            <>
                                <TextField
                                    autoFocus
                                    value={titleValue || ""}
                                    onChange={(e) => setTitleValue(e.target.value)}
                                    margin="dense"
                                    label="Title"
                                    type="name"
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                />
                                <Grid item xs={12} textAlign={"right"}>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            onClick={handleSaveClickTitle}>
                                        Save
                                    </Button>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            color="error"
                                            onClick={(e) => handleCancelClickTitle(e)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </>
                            :
                            <>
                                <Typography>
                                    {titleValue}
                                </Typography>
                                <Grid item xs={12} textAlign={"right"}>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            onClick={handleEditClickTitle}>
                                        Edit
                                    </Button>
                                </Grid>
                            </>
                    }
                    <Title>Description</Title>
                    {
                        isEditingDescription ?
                            <>
                                <TextField
                                    autoFocus
                                    value={descriptionValue || ""}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                    margin="dense"
                                    label="Description"
                                    type="name"
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                />
                                <Grid item xs={12} textAlign={"right"}>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            onClick={handleSaveClickDescription}>
                                        Save
                                    </Button>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            color="error"
                                            onClick={(e) => handleCancelClickDescription(e)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </>
                            :
                            <>
                                <Typography>
                                    {descriptionValue}
                                </Typography>
                                <Grid item xs={12} textAlign={"right"}>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            onClick={handleEditClickDescription}>
                                        Edit
                                    </Button>
                                </Grid>
                            </>
                    }
                </Grid>
            </Grid>


            <Divider style={{width: '100%'}}>Contact</Divider>
            <ContactSection resumeId={resumeData.id}></ContactSection>

            <Divider style={{width: '100%'}}>Skills</Divider>
            <SkillSection resumeId={resumeData.id || "AWAITING"}></SkillSection>

            <Divider style={{width: '100%'}}>Experiences</Divider>
            <ExperienceSection resumeId={resumeData.id}></ExperienceSection>

            <Divider style={{width: '100%'}}>Formations</Divider>
            <FormationSection resumeId={resumeData.id}></FormationSection>

            <Divider style={{width: '100%'}}>Languages</Divider>
            <LanguageSection resumeId={resumeData.id}></LanguageSection>

            <Divider style={{width: '100%'}}>Hobbies</Divider>
            <HobbySection resumeId={resumeData.id}></HobbySection>

            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 2}}>
                <Grid item>
                    <Button component={Link} to={"/resume/preview"}
                            size="large"
                            color="primary"
                            variant="outlined">
                        Preview resume
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => resetResumeSafeguard()}
                            size="large"
                            color="error"
                            variant="outlined">
                        Reset resume
                    </Button>
                </Grid>

            </Box>

        </Grid>
    </Paper>;
}
Resume.componentName = "Resume"
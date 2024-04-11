import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
import {useQuickActions} from "../hooks/useQuickActions.js";

export default function Resume() {

    //Using skills data
    const {resumeData, setResumeData, updateResume, resetResume} = useResume()

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

    const [isEditing, setIsEditing] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState("");

    //Description updates when resume data updates
    useEffect(() => {
        setDescriptionValue(resumeData.description)

        //dispatch("MOUNT_ACTION", "preview resume")
        //dispatch("MOUNT_ACTION", "clear resume")

    }, [resumeData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        updateResume(descriptionValue).then((data) => {
            setResumeData({
                resumeId: data.id,
                description: data.description,
                Image: data.Image
            })
            console.log("UPDATED RESUME", data)
        })
    };

    const handleCancelClick = (e) => {
        setIsEditing(false);
        setDescriptionValue(e.target.value)
    };


    return <Box gridAutoFlow='row' className={"Element-"}
                component="main"
                sx={{
                    backgroundColor: "#FFF",
                    height: '100vh',
                    overflow: 'auto',

                }}
    >
        <Toolbar/>
        <Grid container sx={{p: 3}} style={{backgroundColor: "#FFF", borderRadius: "8px", padding: "20px"}}>
            <Grid container marginY="10px">
                <Grid item xs={3}>
                    <ImageAction resumeData={resumeData}/>
                </Grid>
                <Grid item xs={9} padding="5px">
                    <Title>Description</Title>
                    {
                        isEditing ?
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
                                            onClick={handleSaveClick}>
                                        Save
                                    </Button>
                                    <Button variant="outlined"
                                            style={{margin: "10px"}}
                                            color="error"
                                            onClick={(e) => handleCancelClick(e)}>
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
                                            onClick={handleEditClick}>
                                        Edit
                                    </Button>
                                </Grid>
                            </>
                    }

                </Grid>
            </Grid>


            <ContactSection resumeId={resumeData.id}></ContactSection>
            <Divider style={{width:'100%'}}>Skills</Divider>
            <SkillSection resumeId={resumeData.id || "AWAITING"}></SkillSection>
            <Divider style={{width:'100%'}}>Experiences</Divider>

            <ExperienceSection resumeId={resumeData.id}></ExperienceSection>
            <Divider style={{width:'100%'}}>Academic</Divider>

            <FormationSection resumeId={resumeData.id}></FormationSection>
            <Divider style={{width:'100%'}}>Hobbies</Divider>

            <HobbySection resumeId={resumeData.id}></HobbySection>
            <Divider style={{width:'100%'}}>Languages</Divider>

            <LanguageSection resumeId={resumeData.id}></LanguageSection>


            <Grid item
                  xs={12}
                  textAlign="right"
                  marginY="10px">
                <Button component={Link} to={"/previewResume"}
                        style={{position:"fixed", bottom:"32px", right:"15vw"}}
                        size="large"
                        color="primary"
                        variant="contained">
                    Preview resume
                </Button>
                <Button  onClick={() => resetResumeSafeguard()}
                        size="large"
                        color="error"
                        variant="contained">
                    Reset resume
                </Button>
            </Grid>

        </Grid>
    </Box>;
}
Resume.componentName = "Resume"
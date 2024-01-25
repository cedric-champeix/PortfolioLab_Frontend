import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Title from "../components/Title.jsx";
import Typography from "@mui/material/Typography";
import {Card, CardContent} from "@mui/material";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {useConfirmation} from "../hooks/useConfirmation.js";
import ImageAction from "../features/resume/components/ImageAction.jsx";
import LanguageAction from "../features/resume/components/LanguageAction.jsx";
import {useResume} from "../features/resume/hooks/useResume.js";
import TextField from "@mui/material/TextField";
import {useLanguage} from "../features/resume/hooks/useLanguage.js";
import ExperienceSection from "../features/resume/components/ExperienceSection.jsx";
import SkillSection from "../features/resume/components/SkillSection.jsx";
import ContactSection from "../features/resume/components/ContactSection.jsx";
import FormationSection from "../features/resume/components/FormationSection.jsx";
import HobbySection from "../features/resume/components/HobbySection.jsx";

export default function Resume() {
    //Using skills data
    const {resumeData, setResumeData, updateResume, resetResume} = useResume()
    const {languageData, setLanguageData, createLanguage, updateLanguage, removeLanguage} = useLanguage()

    //Confirmaton : safeguard hook
    const confirm = useConfirmation();

    //Generic remove safeguard to test and implement
    const removeSafeguard = (resourceId, resourceName, resourceType) => {
        confirm({
            catchOnCancel: true,
            name: resourceName
        }).then(() => {
            switch (resourceType) {
                case "contact":
                    removeContact(resourceId).then(() => {
                        console.log("Contact removed : " + resourceName)
                    })
                    break
                case "skill":
                    removeSkill(resourceId).then(() => {
                        console.log("Skill removed : " + resourceName)
                    })
                    break
                case "experience":
                    remove(resourceId).then(() => {
                        console.log("Removed experience");
                    })
                    break
                case "formation":
                    removeFormation(resourceId).then(() => {
                        console.log("Formation removed")
                    })
                    break
                case "language":
                    removeLanguage(resourceId).then(() => {
                        console.log("Language removed")
                    })
                    break
                case "hobby":
                    removeHobbie(resourceId).then(() => {
                        console.log("Hobby removed")
                    })
            }
        })
    }
    //Just clear all the other hook's data
    const resetResumeSafeguard = () => {
        confirm({
            catchOnCancel: true,
            name: "Resume"
        }).then(() => {
            resetResume().then(() => {
                setDescriptionValue("")
                setContactsData([])
                setSkillsData([])
                setExperiencesData([])
                setFormationsData([])
                setLanguageData([])
                setHobbiesData([])
            })
            console.log("Reset resume")
        })
    }

    const [isEditing, setIsEditing] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState("");

    //Description updates when resume data updates
    useEffect(() => {
        setDescriptionValue(resumeData.description)
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
                image: data.image
            })
            console.log(data)
        })
    };

    const handleCancelClick = (e) => {
        setIsEditing(false);
        setDescriptionValue(e.target.value)
    };


    return <Box gridAutoFlow='row' className={"Element-"}
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',

                }}
    >
        <Toolbar/>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
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
                                        value={descriptionValue ? descriptionValue : ""}
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
                <SkillSection resumeId={resumeData.id}></SkillSection>
                <ExperienceSection resumeId={resumeData.id}></ExperienceSection>
                <FormationSection resumeId={resumeData.id}></FormationSection>
                <HobbySection resumeId={resumeData.id}></HobbySection>

                <Grid container marginY="10px">
                    <Grid container marginY="10px">
                        <Grid item xs={6}>
                            <Title>Languages</Title>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <LanguageAction type={"add"}
                                            languageName={""}
                                            languageLevel={""}
                                            resumeId={resumeData.resumeId}
                                            createLanguage={createLanguage}
                                            updateLanguage={updateLanguage}>
                                Add a language
                            </LanguageAction>
                        </Grid>
                    </Grid>
                    {
                        languageData.map((language, i) => (
                            <Grid item xs={3} key={language.name + i}>
                                <Card style={{
                                    height: "140px",
                                    margin: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <CardContent style={{padding: "0 0 10px 0"}}>
                                        <Typography variant="h5" component="div">
                                            {language.name}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {language.level}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <LanguageAction type={"edit"}
                                                        languageId={language.id}
                                                        languageName={language.name}
                                                        languageLevel={language.level}
                                                        resumeId={resumeData.resumeId}
                                                        createLanguage={createLanguage}
                                                        updateLanguage={updateLanguage()}></LanguageAction>
                                        <Button
                                            onClick={() => removeSafeguard(language.id, language.name, "language")}
                                            size="small"
                                            color="error">
                                            <img src={"/src/assets/icons/rubbish_bin.svg"}
                                                 alt={"Delete language"}/>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                </Grid>


                <Grid item
                      xs={12}
                      textAlign="right"
                      marginY="10px">
                    <Button onClick={() => resetResumeSafeguard()}
                            size="large"
                            color="error"
                            variant="contained">
                        Reset resume
                    </Button>
                </Grid>

            </Grid>
        </Container>
    </Box>;
}
Resume.componentName = "Resume"
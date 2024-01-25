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
import {truncate} from "../features/resume/utils/truncate.js"
import {useConfirmation} from "../hooks/useConfirmation.js";
import ImageAction from "../features/resume/components/ImageAction.jsx";
import ContactAction from "../features/resume/components/ContactAction.jsx";
import SkillAction from "../features/resume/components/SkillAction.jsx";
import ExperienceAction from "../features/resume/components/ExperienceAction.jsx";
import FormationAction from "../features/resume/components/FormationAction.jsx";
import LanguageAction from "../features/resume/components/LanguageAction.jsx";
import HobbyAction from "../features/resume/components/HobbyAction.jsx";
import {useResume} from "../features/resume/hooks/useResume.js";
import {useContact} from "../features/resume/hooks/useContact.js";
import {useSkills} from "../features/resume/hooks/useSkills.js";
import {useExperience} from "../features/resume/hooks/useExperience.js";
import {useFormation} from "../features/resume/hooks/useFormation.js";
import TextField from "@mui/material/TextField";
import {useHobbies} from "../features/resume/hooks/useHobbies.js";
import {useLanguage} from "../features/resume/hooks/useLanguage.js";
import {useCRUD} from "../features/resume/hooks/useCRUD.js";
import {endpoints} from "../data/endpoints.js"

export default function Resume() {
    //Using skills data
    const {resumeData, setResumeData, updateResume, resetResume} = useResume()
    const {contactsData, setContactsData, createContact, updateContact, removeContact} = useContact()
    const {skillsData, setSkillsData, createSkill, updateSkill, removeSkill} = useSkills();
    const {update, create,remove, data} = useCRUD(endpoints.experienceEndpoint)
    const {formationsData, setFormationsData, createFormation, updateFormation, removeFormation} = useFormation();
    const {hobbiesData, setHobbiesData, createHobbie, updateHobbie, removeHobbie} = useHobbies();
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

                <Grid container marginY="10px">
                    <Grid container marginY="10px">
                        <Grid item xs={6}>
                            <Title>Contacts</Title>
                        </Grid>
                        <Grid item xs={6} textAlign={"right"}>
                            <ContactAction type={"add"}
                                           contactTitle={""}
                                           contactText={""}
                                           createContact={createContact}
                                           resumeId={resumeData.resumeId}></ContactAction>
                        </Grid>
                    </Grid>

                    {
                        contactsData.map((contact, i) => (
                            <Grid item xs={4} key={contact.id + i}>
                                <Card style={{
                                    height: "170px",
                                    margin: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <CardContent style={{padding: "0 0 10px 0"}}>
                                        <Typography variant="h5" component="div">
                                            {contact.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {contact.text}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <ContactAction type={"edit"}
                                                       contactId={contact.id}
                                                       contactTitle={contact.title}
                                                       contactText={contact.text}
                                                       updateContact={updateContact}
                                                       resumeId={resumeData.resumeId}></ContactAction>
                                        <Button onClick={() => removeSafeguard(contact.id, contact.title, "contact")}
                                                size="small"
                                                color="error">
                                            <img src={"/src/assets/icons/rubbish_bin.svg"}
                                                 alt={"Delete contact"}/>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>


                <Grid container marginY="10px">
                    <Grid container marginY="10px">
                        <Grid item xs={6}>
                            <Title>Skills</Title>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <SkillAction type={"add"}
                                         skillName={""}
                                         description={""}
                                         mastery={""}
                                         isSoft={false}
                                         createSkill={createSkill}
                                         resumeId={resumeData.resumeId}>Add a skill</SkillAction>
                        </Grid>
                    </Grid>
                    {
                        skillsData.map((skill, i) => (
                            <Grid item xs={4} key={skill.id + i}>
                                <Card style={{
                                    height: "200px",
                                    margin: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <CardContent style={{padding: "0 0 10px 0"}}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {skill.isSoft ? "Soft skill" : "Technical skill"}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {skill.name}
                                        </Typography>
                                        {skill.isSoft ? null : <Typography color="text.secondary">
                                            {skill.mastery}
                                        </Typography>}
                                        <Typography variant="body2">
                                            {truncate(skill.description, 60)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <SkillAction type={"edit"}
                                                     skillId={skill.id}
                                                     skillName={skill.name}
                                                     description={skill.description}
                                                     mastery={skill.mastery}
                                                     isSoft={skill.isSoft}
                                                     createSkill={createSkill}
                                                     updateSkill={updateSkill}
                                                     resumeId={resumeData.resumeId}></SkillAction>
                                        <Button onClick={() => removeSafeguard(skill.id, skill.name, "skill")}
                                                size="small"
                                                color="error">
                                            <img
                                                src={"/src/assets/icons/rubbish_bin.svg"}
                                                alt={"Delete skill"}/>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

                <Grid container marginY="10px">
                    <Grid container marginY="10px">
                        <Grid item xs={6}>
                            <Title>Experiences</Title>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <ExperienceAction type={"add"}
                                              expTitle={""}
                                              expCompany={""}
                                              expDescription={""}
                                              expStartDate={""}
                                              expEndDate={""}
                                              resumeId={resumeData.id}
                                              create={create}>
                                Add a formation
                            </ExperienceAction>
                        </Grid>
                    </Grid>

                    {
                        data.map((experience, i) => (
                            <Grid item xs={4} key={experience.id + i}>
                                <Card style={{
                                    height: "200px",
                                    margin: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <CardContent style={{padding: "0 0 10px 0"}}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {experience.company}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {experience.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {experience.startDate} - {experience.endDate}
                                        </Typography>
                                        <Typography variant="body2">
                                            {truncate(experience.description, 60)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <ExperienceAction type={"edit"}
                                                          expId={experience.id}
                                                          expTitle={experience.title}
                                                          expCompany={experience.company}
                                                          expDescription={experience.description}
                                                          expStartDate={experience.startDate}
                                                          expEndDate={experience.endDate}
                                                          resumeId={resumeData.resumeId}
                                                          update={update}></ExperienceAction>
                                        <Button
                                            onClick={() => removeSafeguard(experience.id, experience.title, "experience")}
                                            size="small"
                                            color="error">
                                            <img src={"/src/assets/icons/rubbish_bin.svg"}
                                                 alt={"Delete experience"}/>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

                <Grid container marginY="10px">
                    <Grid container marginY="10px">
                        <Grid item xs={6}>
                            <Title>Formations</Title>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <FormationAction type={"add"}
                                             fFormationName={""}
                                             fUniversityName={""}
                                             fStartDate={""}
                                             fEndDate={""}
                                             resumeId={resumeData.resumeId}
                                             createFormation={createFormation}>
                                Add a formation
                            </FormationAction>
                        </Grid>
                    </Grid>
                    {
                        formationsData.map((formation, i) => (
                            <Grid item xs={4} key={formation.id + i}>
                                <Card style={{
                                    height: "200px",
                                    margin: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <CardContent style={{padding: "0 0 10px 0"}}>
                                        <Typography variant="h5" component="div">
                                            {formation.formationName}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {formation.universityName}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {formation.startDate} - {formation.endDate}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <FormationAction type={"edit"}
                                                         fId={formation.id}
                                                         fFormationName={formation.formationName}
                                                         fUniversityName={formation.universityName}
                                                         fStartDate={formation.startDate}
                                                         fEndDate={formation.endDate}
                                                         resumeId={resumeData.resumeId}
                                                         updateFormation={updateFormation}></FormationAction>
                                        <Button
                                            onClick={() => removeSafeguard(formation.id, formation.formationName, "formation")}
                                            size="small"
                                            color="error">
                                            <img src={"/src/assets/icons/rubbish_bin.svg"}
                                                 alt={"Delete formation"}/>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

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

                <Grid container marginY="10px">
                    <Grid container marginY="10px">
                        <Grid item xs={6}>
                            <Title>Hobbies</Title>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <HobbyAction type={"add"}
                                         hobbyName={""}
                                         resumeId={resumeData.resumeId}
                                         hobbieData={hobbiesData}
                                         createHobbie={createHobbie}>
                                Add a hobby
                            </HobbyAction>
                        </Grid>
                    </Grid>
                    {
                        hobbiesData.map((hobby, i) => (
                            <Grid item xs={3} key={hobby.name + i}>
                                <Card style={{
                                    height: "100px",
                                    margin: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <CardContent style={{padding: "0 0 10px 0"}}>
                                        <Typography variant="h5" component="div">
                                            {hobby.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <HobbyAction type={"edit"}
                                                     hobbyName={hobby.name}
                                                     resumeId={resumeData.resumeId}
                                                     updateHobbie={updateHobbie}></HobbyAction>
                                        <Button onClick={() => removeSafeguard(hobby.id,hobby.name, "hobbby")}
                                                size="small"
                                                color="error">
                                            <img src={"/src/assets/icons/rubbish_bin.svg"}
                                                 alt={"Delete hobby"}/>
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
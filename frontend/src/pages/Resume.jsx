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


export default function Resume() {
    //Using skills data
    const {resumeData, setResumeData, getResume, updateResume, resetResume} = useResume()
    const {contactsData, setContactsData, createContact, updateContact, removeContact} = useContact()
    const {skillsData, setSkillsData, createSkill, updateSkill, removeSkill} = useSkills();
    const {
        experiencesData,
        setExperiencesData,
        createExperience,
        updateExperience,
        removeExperience
    } = useExperience();
    const {formationsData, setFormationsData, createFormation, updateFormation, removeFormation} = useFormation();


    //Confirmaton : safeguard hook
    const confirm = useConfirmation();


    //Data retrival
    useEffect(() => {
        console.log("Fetching resume data")

        getResume().then((data) => {
            setResumeData({
                resumeId: data.id,
                description: data.description,
                image: data.image,
                hobbies: data.hobbies,
                languages: data.languages
            })
            setDescriptionValue(data.description)
            setContactsData(data.contacts)
            setSkillsData(data.skills)
            setExperiencesData(data.experiences)
            setFormationsData(data.formations)
        })

    });

    useEffect(() => {
        return () => {
            console.log("Change on skills data");
        };
    }, [skillsData]);


    const removeContactSafeguard = (contactId, contactTitle) => {
        confirm({
            catchOnCancel: true,
            name: contactTitle
        }).then(() => {
            removeContact(contactId);
            console.log("Removing contact")
        })
    }

    /**
     * Triggers the safegard dialog, then handles the action to do
     * @param skillId
     * @param skillName
     */
    const removeSkillSafeguard = (skillId, skillName) => {
        confirm({
            catchOnCancel: true,
            name: skillName
        }).then(() => {
            removeSkill(skillId);
            console.log("Removing skill")
        })
    }

    const removeExperienceSafeguard = (experienceId, experienceName) => {
        confirm({
            catchOnCancel: true,
            name: experienceName
        }).then(() => {
            removeExperience(experienceId);
            console.log("Removing experience")
        })
    }

    const removeFormationSafeguard = (formationId, formationName) => {
        confirm({
            catchOnCancel: true,
            name: formationName
        }).then(() => {
            removeFormation(formationId);
            console.log("Removing formation")
        })
    }

    const removeLanguageSafeguard = (languageName) => {
        confirm({
            catchOnCancel: true,
            name: languageName
        }).then(() => {
            updateResume(
                resumeData.description,
                resumeData.languages.filter(item => {
                    return item.name !== languageName
                }),
                resumeData.hobbies,
            ).then((data) => {
                setResumeData({
                    resumeId: data.id,
                    description: data.description,
                    hobbies: data.hobbies,
                    languages: data.languages,
                    image: data.image
                })
            })
            console.log("Removing language")
        })
    }

    const removeHobbySafeguard = (hobbyName) => {
        confirm({
            catchOnCancel: true,
            name: hobbyName
        }).then(() => {
            updateResume(
                resumeData.description,
                resumeData.languages,
                resumeData.hobbies.filter(item => {
                    return item.name !== hobbyName
                }),
            ).then((data) => {
                setResumeData({
                    resumeId: data.id,
                    description: data.description,
                    hobbies: data.hobbies,
                    languages: data.languages,
                    image: data.image
                })
            })
            console.log("Removing hobby")
        })
    }

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
            })
            console.log("Reset resume")
        })
    }

    const truncate = (str, n) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    };


    const [isEditing, setIsEditing] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState(resumeData.description);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        updateResume(descriptionValue, resumeData.languages, resumeData.hobbies).then((data) => {
            setResumeData({
                resumeId: data.id,
                description: data.description,
                hobbies: data.hobbies,
                languages: data.languages,
                image: data.image
            })
        })
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setDescriptionValue(resumeData.description)
    };

    const handleTextChange = (event) => {
        setDescriptionValue(event.target.value);
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
                                        onChange={handleTextChange}
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
                                                onClick={handleCancelClick}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </>
                                :
                                <>
                                    <Typography>
                                        {resumeData.description}
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
                                           resumeData={resumeData}></ContactAction>
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
                                                       resumeData={resumeData}></ContactAction>
                                        <Button onClick={() => removeContactSafeguard(contact.id, contact.title)}
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
                                         resumeData={resumeData}>Add a skill</SkillAction>
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
                                                     resumeData={resumeData}></SkillAction>
                                        <Button onClick={() => removeSkillSafeguard(skill.id, skill.name)}
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
                                              resumeData={resumeData}
                                              createExperience={createExperience}>
                                Add a formation
                            </ExperienceAction>
                        </Grid>
                    </Grid>

                    {
                        experiencesData.map((experience, i) => (
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
                                                          resumeData={resumeData}
                                                          updateExperience={updateExperience}></ExperienceAction>
                                        <Button
                                            onClick={() => removeExperienceSafeguard(experience.id, experience.title)}
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
                                             resumeData={resumeData}
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
                                                         updateFormation={updateFormation}></FormationAction>
                                        <Button
                                            onClick={() => removeFormationSafeguard(formation.id, formation.formationName)}
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
                                            resumeData={resumeData}
                                            setResumeData={setResumeData}
                                            updateResume={updateResume}>
                                Add a language
                            </LanguageAction>
                        </Grid>
                    </Grid>
                    {
                        resumeData.languages.map((language, i) => (
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
                                                        languageName={language.name}
                                                        languageLevel={language.level}
                                                        resumeData={resumeData}
                                                        setResumeData={setResumeData}
                                                        updateResume={updateResume}></LanguageAction>
                                        <Button
                                            onClick={() => removeLanguageSafeguard(language.name)}
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
                                         resumeData={resumeData}
                                         setResumeData={setResumeData}
                                         updateResume={updateResume}>
                                Add a hobby
                            </HobbyAction>
                        </Grid>
                    </Grid>
                    {
                        resumeData.hobbies.map((hobby, i) => (
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
                                                     resumeData={resumeData}
                                                     setResumeData={setResumeData}
                                                     updateResume={updateResume}></HobbyAction>
                                        <Button onClick={() => removeHobbySafeguard(hobby.name)}
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
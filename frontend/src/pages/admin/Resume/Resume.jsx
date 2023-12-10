import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title.jsx";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext.jsx";
import Typography from "@mui/material/Typography";
import {Card, CardContent} from "@mui/material";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {useConfirmation} from "../../../context/ConfirmationService.jsx";
import SkillAction from "./SkillAction.jsx";
import ExperienceAction from "./ExperienceAction.jsx";
import FormationAction from "./FormationAction.jsx";
import {useResume} from "../../../hooks/useResume.js";
import {useSkills} from "../../../hooks/useSkills.js";
import {useExperience} from "../../../hooks/useExperience.js";
import {useFormation} from "../../../hooks/useFormation.js";


export default function Resume() {
    //Using skills data
    const {resumeData, setResumeData} = useResume()
    const {skillsData, setSkillsData, getSkillsIds, createSkill, updateSkill, removeSkill} = useSkills();
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

    const {currentJwt} = useAuth();

    //Data retrival
    useEffect(() => {
        console.log("Fetching resume data")

        axios({
            url: "http://localhost:8080/editor/resume",
            method: 'GET',
            withCredentials: true
        }).then((response) => {
            const data = response.data

            setResumeData({resumeId: data.id})
            setSkillsData(data.skills)
        }).catch((e) => {
            console.error(e)
        })

    }, []);

    useEffect(() => {
        return () => {
            console.log("Change on skills data");
        };
    }, [skillsData]);


    /**
     * Triggers the safegard dialog, then handles the action to do
     * @param skillId
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

    const removeExperienceSafeguard = (experienceName) => {
        confirm({
            catchOnCancel: true,
            name: experienceName
        }).then(() => {
            removeExperience(experienceName);
            console.log("Removing experience")
        })
    }

    const removeFormationSafeguard = (formationName) => {
        confirm({
            catchOnCancel: true,
            name: formationName
        }).then(() => {
            removeFormation(formationName);
            console.log("Removing formation")
        })
    }

    const truncate = (str, n) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    };

    let data = {}

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
            <Grid container sx={{p: 3}} style={{backgroundColor: "#FFF", borderRadius: "8px"}}>
                <Grid item xs={12}>
                    <Title>My resume</Title>
                    <br/>
                </Grid>
                <Grid item xs={3}>
                    <Box component={"img"} width={156} src={"src/assets/data/Photo_profil_256.png"}></Box>
                </Grid>
                <Grid item xs={9}>
                    <Typography>Welcome to my online CV! My name is Arnaud, and I'm an IT developer specialising in the
                        web. I've had a passion for programming since I was a teenager, so I decided to dedicate myself
                        to IT development. I'm currently studying for a double degree in general computing in Dublin. At
                        the same time, I'm honing my skills and experience, both personal and professional, through
                        various personal and professional projects.</Typography>
                    <br/><br/><br/>
                </Grid>
                <Grid item xs={12}>
                    <Title>My skills</Title>
                </Grid>
                <Grid item xs={12} textAlign={"right"}>
                    <SkillAction type={"add"} skillName={""} description={""} mastery={""} isSoft={false}
                                 createSkill={createSkill}
                                 resumeData={resumeData}>Add a skill</SkillAction>
                </Grid>
                {
                    skillsData.map((skill, i) => (
                        <Grid item xs={4} key={skill.name + i}>
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
                                    <SkillAction type={"edit"} skillId={skill.id} skillName={skill.name}
                                                 description={skill.description}
                                                 mastery={skill.mastery} isSoft={skill.isSoft} skillsData={skillsData}
                                                 createSkill={createSkill} updateSkill={updateSkill}
                                                 resumeData={resumeData}></SkillAction>
                                    <Button onClick={() => removeSkillSafeguard(skill.id, skill.name)} size="small"
                                            color={"error"}><img src={"/src/assets/icons/rubbish_bin.svg"}
                                                                 alt={"Delete skill"}/></Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
                <br/>

                <Grid item xs={12}>
                    <Title>My experiences</Title>
                </Grid>
                <Grid item xs={12} textAlign={"right"}>
                    <ExperienceAction type={"add"}
                                      expTitle={""}
                                      expCompany={""}
                                      expDescription={""}
                                      expStartDate={""}
                                      expEndDate={""}
                                      createExperience={createExperience}>
                        Add a formation
                    </ExperienceAction>
                </Grid>
                {
                    experiencesData.map((experience, i) => (
                        <Grid item xs={4} key={experience.title + i}>
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
                                                      expTitle={experience.title}
                                                      expCompany={experience.company}
                                                      expDescription={experience.description}
                                                      expStartDate={experience.startDate}
                                                      expEndDate={experience.endDate}
                                                      updateExperience={updateExperience}></ExperienceAction>
                                    <Button onClick={() => removeExperienceSafeguard(experience.title)} size="small"
                                            color={"error"}><img src={"/src/assets/icons/rubbish_bin.svg"}
                                                                 alt={"Delete skill"}/></Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                <br/>

                <Grid item xs={12}>
                    <Title>My formations</Title>
                </Grid>
                <Grid item xs={12} textAlign={"right"}>
                    <FormationAction type={"add"}
                                      fFormationName={""}
                                      fUniversityName={""}
                                      fStartDate={""}
                                      fEndDate={""}
                                      createFormation={createFormation}>
                        Add a formation
                    </FormationAction>
                </Grid>
                {
                    formationsData.map((formation, i) => (
                        <Grid item xs={4} key={formation.formationName + i}>
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
                                                      fFormationName={formation.formationName}
                                                      fUniversityName={formation.universityName}
                                                      fStartDate={formation.startDate}
                                                      fEndDate={formation.endDate}
                                                      updateFormation={updateFormation}></FormationAction>
                                    <Button onClick={() => removeFormationSafeguard(formation.formationName)}
                                            size="small"
                                            color={"error"}><img src={"/src/assets/icons/rubbish_bin.svg"}
                                                                 alt={"Delete skill"}/></Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                <br/>
            </Grid>
        </Container>
    </Box>
}
Resume.componentName = "Resume"
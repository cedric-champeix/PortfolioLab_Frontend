import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title.jsx";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext.jsx";
import Typography from "@mui/material/Typography";
import {useSkills} from "../../../hooks/useSkills.js";
import {Card, CardContent} from "@mui/material";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {useConfirmation} from "../../../context/ConfirmationService.jsx";
import {skillData} from "../../../data/skillData.js";



export default function Resume() {

    //const [skillsData, setSkillsData] = useState([]);
    const {skillsData, addSkill, removeSkill} = useSkills(skillData);
    const confirm = useConfirmation();

    const {currentJwt} = useAuth();
    console.log(
        currentJwt + " from Reusme"
    )
    useEffect( () => {
          axios({
            url: "http://localhost:8080/editor/skills",
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${currentJwt}`
            },
        }).then((res) => {
            console.log(res)});

    }, []);

    const removeSkillSafeguard = (skillName) => {
        confirm({
            catchOnCancel: true,
            skillName: skillName
        }).then(() => {
            removeSkill(skillName)
            console.log("Removing skill")
        }).catch(() => {
                console.log("Catching safeguard")});
    }


    return  <Box gridAutoFlow='row' className={"Element-"}
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
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container sx={{p:3}} style={{backgroundColor: "#FFF", borderRadius: "8px"}}>
                <Grid item xs={12}>
                    <Title>My resume</Title>
                    <br/>
                </Grid>
                <Grid item xs={3} >
                    <Box component={"img"} width={156} src={"src/assets/data/Photo_profil_256.png"}></Box>
                </Grid>
                <Grid item xs={9}>
                    <Typography>Welcome to my online CV! My name is Arnaud, and I'm an IT developer specialising in the web. I've had a passion for programming since I was a teenager, so I decided to dedicate myself to IT development. I'm currently studying for a double degree in general computing in Dublin. At the same time, I'm honing my skills and experience, both personal and professional, through various personal and professional projects.</Typography>
                    <br/><br/><br/>
                </Grid>
                <Grid item xs={12}>
                    <Title>My skills</Title>
                </Grid>
                {
                    skillsData.map((item, i) => (
                        <Grid xs={4} >
                            <Card style={{height:200, margin:"8px"}}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {item.isSoft==="true" ? "Soft skill" : "Technical skill"}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.mastery}
                                    </Typography>
                                    <Typography variant="body2">
                                        {item.description}
                                        <br />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Edit</Button>
                                    <Button onClick={() => removeSkillSafeguard(item.name)} size="small" color={"error"}>Remove</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    </Box>
}
Resume.componentName="Resume"
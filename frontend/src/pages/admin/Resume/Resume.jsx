import React, {useEffect, useState} from "react";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {FormControl, MenuItem, Paper, Select} from "@mui/material";
import Title from "../../../components/Title.jsx";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext.jsx";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SkillForm from "./SkillForm.jsx";
export default function Resume() {

    const [skillsData, setSkillsData] = useState([]);
    const {currentJwt, setCurrentJwt} = useAuth();
    console.log(
        currentJwt
    )
    useEffect( () => {
        let fetch =  axios({
            url: "http://localhost:8080/editor/skills",
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${currentJwt}`
            },
        }).then((res) => {
            console.log(res)});

    }, []);


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
            <Grid container spacing={3}>
                <Grid item xs={6} lg={6} height={600} backgroundColor={"#FFF"}>
                    <Title>My resume</Title>
                    <Grid item>
                        <Box component={"img"} width={128} src={"src/assets/data/Photo_profil_256.png"}></Box>
                    </Grid>
                   <Grid ></Grid>
                </Grid>

                <Grid item xs={6} height={600} lg={6} backgroundColor={"#FFF"}>


                        <Title>Preview</Title>

                </Grid>
            </Grid>
        </Container>
    </Box>
}
Resume.componentName="Resume"
import React, {useEffect, useState} from "react";
import Dashboard from "./Dashboard.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import Title from "../../components/Title.jsx";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";
import Cookies from "js-cookie";


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
    return  <Box gridAutoFlow='row'
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
                <Grid item xs={5} lg={6} height={600}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 600,
                    }}>

                        <Title>My resume</Title>
                    </Paper>
                </Grid>
                <Grid item xs={5} height={600} lg={6}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 600,
                    }}>

                        <Title>Preview</Title>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Box>
}
Resume.componentName="Resume"
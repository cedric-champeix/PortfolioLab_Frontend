import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Title from "../components/Title.jsx";
import {useAuth} from "../hooks/useAuth.js";

export default function Dashboard() {

    const {userId, username} = useAuth()
    console.log(userId)
    console.log(username)


    return <Box gridAutoFlow='row'
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
        <Container sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Title>My projects</Title>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3} height={"100%"}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240
                        }}
                    >
                        <Title>Messages</Title>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Title>Popular users</Title>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Box>
}
Dashboard.componentName = "Dashboard";
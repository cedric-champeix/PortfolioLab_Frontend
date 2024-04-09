import "./preview.css"
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {useAuth} from "../hooks/useAuth.js";
import ViewResume from "../features/viewer/ViewResume.jsx";
import Grid from "@mui/material/Grid";
import styles from './preview.css';

export default function Dashboard() {

    const {userId, username} = useAuth()
    console.log(userId)
    console.log(username)


    return <Box style={styles}
                component="div"
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
        <Grid container spacing={3}>
            <ViewResume style={{border:"1px solid red"}}></ViewResume>

        </Grid>
    </Box>
}
Dashboard.componentName = "Dashboard";
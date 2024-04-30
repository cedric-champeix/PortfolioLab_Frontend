import {useParams} from "react-router-dom";
import BaseResume from "../../features/viewer/resume/BaseResume.jsx";
import {useViewerResume} from "../../features/viewer/resume/hooks/useViewerResume.js";
import {useAuth} from "../../hooks/useAuth.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ViewerResume() {

    let {username} = useParams()

    //const {username} = useAuth()

    if(username)

    if (!username) {
        username = useAuth().username
    }

    const {userResume} = useViewerResume(username)

    console.log("This is the resume data: ", userResume)

    return <Box container sx={{width: "100%"}}>
        {
            userResume.published ?
                <BaseResume userResume={userResume}/>:
                <Box display="flex "className="alignSteuplé" alignItems="center"
                       justifyContent="center"
                       sx={{ minHeight: '100vh' }}>
                    <Typography variant="h5" component="div">User resume not published</Typography>
                </Box>

        }
    </Box>
}
ViewerResume.componentName = "Resume"
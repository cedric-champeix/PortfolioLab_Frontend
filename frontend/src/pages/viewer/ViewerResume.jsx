import {useParams} from "react-router-dom";
import BaseResume from "../../features/viewer/resume/BaseResume.jsx";
import {useViewerResume} from "../../features/viewer/resume/hooks/useViewerResume.js";
import {useAuth} from "../../hooks/useAuth.js";
import Box from "@mui/material/Box";

export default function ViewerResume() {

    let {username} = useParams()

    //const {username} = useAuth()

    if(username)

    if (!username) {
        username = useAuth().username
    }

    const {userResume} = useViewerResume(username)

    return <Box sx={{width: "100%"}}>
        <BaseResume userResume={userResume}/>
    </Box>
}
ViewerResume.componentName = "Resume"
import React from "react";
import {useParams} from "react-router-dom";
import BaseResume from "../../features/viewer/resume/BaseResume.jsx";
import {useViewerResume} from "../../features/viewer/resume/hooks/useViewerResume.js";
import {useAuth} from "../../hooks/useAuth.js";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function ViewerResume() {

    let {username} = useParams()

    if (!username) {
        username = useAuth().username
    }

    const {userResume} = useViewerResume(username)

    return <Box sx={{width: "100%"}}>
        <Toolbar/>
        <BaseResume userResume={userResume}/>
    </Box>
}
ViewerResume.componentName = "Resume"
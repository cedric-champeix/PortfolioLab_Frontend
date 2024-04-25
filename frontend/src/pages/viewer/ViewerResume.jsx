import React from "react";
import {useParams} from "react-router-dom";
import ViewResume from "../../features/viewer/resume/ViewResume.jsx";
import {useViewerResume} from "../../features/viewer/resume/hooks/useViewerResume.js";
import {useAuth} from "../../hooks/useAuth.js";

export default function ViewerResume() {

    let {username} = useParams()

    if (!username) {
        username = useAuth().username
    }

    const {userResume} = useViewerResume(username)

    return <ViewResume userResume={userResume}/>
}
ViewerResume.componentName = "Resume"
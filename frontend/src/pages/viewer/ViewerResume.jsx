import React from "react";
import {useParams} from "react-router-dom";
import ViewResume from "../../features/viewer/ViewResume.jsx";
import {useViewerResume} from "../../features/viewer/resume/hooks/useViewerResume.js";

export default function ViewerResume() {

    const {username} = useParams()

    const {userResume} = useViewerResume(username)

    return <ViewResume userResume={userResume}/>
}
ViewerResume.componentName = "Resume"
import Box from "@mui/material/Box";
import BaseResume from "../features/viewer/resume/BaseResume.jsx";
import {useResumePreview} from "../features/resume/hooks/useResumePreview.js";

export default function PreviewResume() {

    const {resumePreview} = useResumePreview()

    return <Box container sx={{width: "100%"}}>
        <BaseResume userResume={resumePreview}/>
    </Box>
}
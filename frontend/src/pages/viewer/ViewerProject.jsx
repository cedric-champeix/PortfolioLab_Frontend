import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useComponent} from "../../features/project/hooks/useComponent.js";
import {constants} from "../../constants.js";
import placeHolder from "../../assets/icons/placeholder.png";
import SkillChipViewer from "../../features/skills/components/SkillChipViewer.jsx";
import {Stack} from "@mui/material";
import {useViewerProject} from "../../features/viewer/portfolio/hooks/useViewerProject.js";
import ViewerComponentFactory from "../../features/viewer/portfolio/ViewerComponentFactory.jsx";
import NotFoundPage from "../error/404.jsx";

export default function ViewerProject() {

    const {username, projectId} = useParams()

    const {project, projectError} = useViewerProject(username, projectId)

    const {components, setComponents} = useComponent(projectId, project.components)

    const [mainImage, setMainImage] = useState(project.MainImage ? constants.BACKEND_URL + project.MainImage.path : placeHolder)

    useEffect(() => {
        setComponents(project.components)
        setMainImage(project.MainImage ? constants.BACKEND_URL + project.MainImage.path : placeHolder)
    }, [project])

    const fallbackImage = () => {
        setMainImage(placeHolder)
    }

    if (projectError)
        return <NotFoundPage/>

    return <Box sx={{width: "100%"}}>

        <Grid container sx={{
            p: 3,
            backgroundColor: "#FFF",
            width: "100%",
            maxWidth: "1400px",
            margin: "auto",
            padding: "30px 5%"
        }}>

            <Grid item xs={12}>
                <Typography width="fit-content"
                            variant="h2"
                            color="primary"
                            gutterBottom>
                    {project.name}
                </Typography>
            </Grid>

            <Grid item xs={12} style={{
                margin: "0 auto 30px auto",
                display: 'flex',
                justifyContent: "center"
            }}>
                <Box component={"img"}
                     margin="auto"
                     width="80%"
                     maxWidth="900px"
                     maxHeight="500px"
                     src={mainImage}
                     onError={fallbackImage}
                     alt={"Project Image"}/>
            </Grid>

            <Grid container padding="0 0 30px 0" spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography width="fit-content"
                                variant="h4"
                                color="primary"
                                margin="0 0 10px 0">
                        Description
                    </Typography>
                    <Typography width="fit-content" padding="0 24px" color="black">
                        {project.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography width="fit-content" variant="h4" color="primary"
                                margin="0 0 10px 0">Skills</Typography>
                    <Stack direction="row" spacing={2} style={{flexWrap: "wrap", padding: "0 10px"}}>
                        {project.skills.map((skill) => (
                            <SkillChipViewer skill={skill} key={skill.id}/>
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            {components.map((component) => (
                <div style={{width: "100%"}} key={component.id}>
                    <ViewerComponentFactory component={component}/>
                </div>
            ))}

        </Grid>
    </Box>;
}
ViewerProject.componentName = "Project"
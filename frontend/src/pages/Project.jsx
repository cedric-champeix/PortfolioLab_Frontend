import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useProject} from "../features/project/hooks/useProject.js";
import SkillContainer from "../features/project/components/SkillContainer.jsx";
import ComponentFactory from "../features/project/ComponentFactory.jsx";
import AddComponent from "../features/project/components/AddComponent.jsx";
import {useParams} from "react-router-dom";
import {useComponent} from "../features/project/hooks/useComponent.js";
import MoveComponent from "../features/project/components/MoveComponent.jsx";
import ImageHandler from "../features/images/components/ImageHandler.jsx";
import Button from "@mui/material/Button";
import {constants} from "../constants.js";
import placeHolder from "../assets/icons/placeholder.png";

export default function Project() {

    const {projectId} = useParams()

    const {projectData, connectMainImage} = useProject(projectId)

    const {components, setComponents, create, update, move, remove} = useComponent(projectId, projectData.components)

    const [mainImage, setMainImage] = useState(projectData.MainImage ? constants.BACKEND_URL + projectData.MainImage.path : placeHolder)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setComponents(projectData.components)
        setMainImage(projectData.MainImage ? constants.BACKEND_URL + projectData.MainImage.path : placeHolder)
    }, [projectData])

    const fallbackImage = () => {
        setMainImage(placeHolder)
    }

    const toggle = () => {
        setOpen(!open)
    }

    const updateImage = (newImage) => {
        connectMainImage(newImage)
    }

    return <Box gridAutoFlow='row' className={"Element-"}
                component="div"
                sx={{
                    backgroundColor: "#FFF",
                    height: '100vh',
                    width: "100%",
                    overflow: 'auto',
                }}
    >
        <Toolbar/>
        <Grid container sx={{p: 3}} style={{backgroundColor: "#FFF", width: "80%", margin: "auto", padding: "30px 5%"}}>

            <Grid item xs={12}>
                <Typography width="fit-content" variant="h2" color="primary" gutterBottom>
                    {projectData.name}
                </Typography>
            </Grid>

            <Grid item xs={12} style={{
                margin: "0 auto 30px auto",
                display: 'flex',
                justifyContent: "center"
            }}>
                <ImageHandler open={open} toggle={toggle} callback={updateImage}/>
                <Button width="80%" onClick={toggle}>
                    <Box component={"img"}
                         margin="auto"
                         width="90%"
                         maxWidth="900px"
                         maxHeight="500px"
                         src={mainImage}
                         onError={fallbackImage}
                         alt={"Project Image"}/>
                </Button>
            </Grid>

            <Grid container padding="0 0 30px 0" spacing={2}>
                <Grid item xs={6}>
                    <Typography width="fit-content" variant={"h4"} color="primary"
                                margin="0 0 10px 0">Description</Typography>
                    <Typography width="fit-content" padding="0 24px">
                        {projectData.description}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography width="fit-content" variant={"h4"} color="primary"
                                margin="0 0 10px 0">Skills</Typography>
                    <SkillContainer projectId={projectData.id}/>
                </Grid>
            </Grid>

            <AddComponent create={create} index={-2} distance={2} prevIndex={null} nextIndex={null}/>

            {components.map((component, i, list) => (
                <div style={{width: "100%"}} key={component.id}>
                    <ComponentFactory component={component} update={update} remove={remove}/>
                    {
                        list[i + 1] ? <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <MoveComponent id={list[i + 1].id}
                                                   move={move}
                                                   prevIndex={component.index - 2}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <AddComponent create={create}
                                                  index={list[i + 1] ? list[i].index + (list[i + 1].index - list[i].index) / 2 : component.index + 10}
                                                  distance={list[i + 1] ? (list[i + 1].index - list[i].index) / 2 : 10}/>
                                </Grid>
                                <Grid item xs={2}>
                                    <MoveComponent id={component.id}
                                                   move={move}
                                                   nextIndex={list[i + 1].index + 2}/>
                                </Grid>
                            </Grid> :
                            <AddComponent id={component.id}
                                          create={create}
                                          index={list[i + 1] ? list[i].index + (list[i + 1].index - list[i].index) / 2 : component.index + 10}
                                          distance={list[i + 1] ? (list[i + 1].index - list[i].index) / 2 : 10}/>
                    }
                </div>
            ))}

        </Grid>
    </Box>;
}
Project.componentName = "Project"
import React, {useEffect} from "react";
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

export default function Project() {

    const {projectId} = useParams()

    const {projectData} = useProject(projectId)

    const {components, setComponents, create, update, move, remove} = useComponent(projectId, projectData.components)

    useEffect(() => {
        setComponents(projectData.components)
    }, [projectData]);

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

            <Typography width="fit-content" variant="h2" color="primary" gutterBottom>
                {projectData.name}
            </Typography>

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
                    <SkillContainer projectId={projectData.id} skills={projectData.skills}></SkillContainer>
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
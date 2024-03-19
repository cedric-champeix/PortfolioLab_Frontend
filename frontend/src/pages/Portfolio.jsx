import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ProjectAction from "../features/portfolio/ProjectAction.jsx";

;
import Grid from "@mui/material/Grid";
import {useProjects} from "../features/portfolio/hooks/useProjects.js";
import ProjectCard from "../features/portfolio/ProjectCard.jsx";

export default function Portfolio() {

    const {projects, create, update, remove} = useProjects()

    return <Box gridAutoFlow='row' className={"Element-"}
                component="main"
                sx={{
                    backgroundColor: "#FFF",
                    height: '100vh',
                    overflow: 'auto',
                }}
    >

        <Toolbar/>

        <Grid container sx={{p: 3}} spacing={2}>
            {projects.map((project) =>
                <Grid item key={project.id}>
                    <ProjectCard project={project}
                                 update={update}
                                 remove={remove}/>
                </Grid>
            )}
        </Grid>


        <Box sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            p: 1,
            borderRadius: "50%"
        }}
        >
            <ProjectAction project={{}}
                           create={create}
                           isEditing={false}></ProjectAction>
        </Box>
    </Box>

}
Portfolio.componentName = "Portfolio"
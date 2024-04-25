import Box from "@mui/material/Box";
import ProjectAction from "../features/portfolio/ProjectAction.jsx";
import Grid from "@mui/material/Grid";
import {useProjects} from "../features/portfolio/hooks/useProjects.js";
import ProjectCard from "../features/portfolio/ProjectCard.jsx";

export default function Portfolio() {

    const {projects, create, remove} = useProjects()

    return <Box gridAutoFlow='row' className={"Element-"}
                component="div"
                sx={{
                    backgroundColor: "#FFF",
                    height: "95vh"
                }}>

        <Grid container sx={{p: 3}} spacing={2}>
            {projects.map((project) =>
                <Grid item key={project.id}>
                    <ProjectCard project={project}
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
        }}>
            <ProjectAction create={create}></ProjectAction>
        </Box>
    </Box>

}
Portfolio.componentName = "Portfolio"
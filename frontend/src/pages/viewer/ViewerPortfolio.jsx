import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ViewerProjectCard from "../../features/viewer/portfolio/ViewerProjectCard.jsx";
import {useParams} from "react-router-dom";
import {useViewerPortfolio} from "../../features/viewer/portfolio/hooks/useViewerPortfolio.js";

export default function ViewerPortfolio() {

    const {username} = useParams()

    const {projects} = useViewerPortfolio(username)

    return <Box gridAutoFlow='row' className={"Element-"}
                component="main"
                sx={{
                    backgroundColor: "#FFF",
                    height: '100vh',
                    overflow: 'auto',
                }}
    >
        <Grid container sx={{p: 3}} spacing={2}>
            {projects.map((project) =>
                <Grid item key={project.id}>
                    <ViewerProjectCard username={username} project={project}/>
                </Grid>
            )}
        </Grid>
    </Box>

}
ViewerPortfolio.componentName = "Portfolio"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ProjectAction from "../features/portfolio/ProjectAction.jsx";
import {projectsData} from "../features/portfolio/data/projectsData.js";
import Grid from "@mui/material/Grid";
import {Card, CardContent, CardMedia} from "@mui/material";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {useState} from "react";

export default function Portfolio() {

    //const {update, create, remove, data} = useCRUD(endpoints.projectsEndpoint)
    const [data, setData] = useState(projectsData)
    const createProject = (title, description, imgLink) => {
        const body = {
            title: title,
            description: description,
            imgLink: imgLink
        }
        setData([...data, body])
    }

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
            {data.map((item) =>
                <Grid item key={item.title}>
                    <Card  sx={{ width: 350 }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            image={item.image}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {
                                    item.title
                                }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Edit</Button>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    </Card>
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
            <ProjectAction createProject={createProject}></ProjectAction>
        </Box>
    </Box>

}
Portfolio.componentName = "Portfolio"
import {Box, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import ProjectAction from "./ProjectAction.jsx";
import placeHolder from "../../assets/icons/placeholder.png"
import {useState} from "react";
import {constants} from "../../constants.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function ProjectCard({project, update, remove}) {

    const [image, setImage] = useState(project.MainImage?.path ? constants.BACKEND_URL + "" + project.MainImage.path : placeHolder);

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    const deleteProject = (e) => {
        remove(project.id)
    }

    return <Card sx={{width: 350}}>
        <Link to={"/portfolio/" + project.id}>
            <Box component={"img"}
                 sx={{
                     height: 180, width: "100%",
                     overflow: "hidden"
                 }}
                 src={image}
                 onError={fallbackImage}
                 alt={"Project Image"}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {
                        project.name
                    }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {project.description}
                </Typography>
            </CardContent>
        </Link>
        <CardActions>
            <ProjectAction project={project} update={update} isEditing={true}/>
            <Button size="small"
                    onClick={deleteProject}>
                Delete
            </Button>
        </CardActions>
    </Card>
}

ProjectCard.propTypes = {
    project: PropTypes.object,
    update: PropTypes.func,
    remove: PropTypes.func,
}
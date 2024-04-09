import {Box, Card, CardContent, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/joy";
import placeHolder from "../../assets/icons/placeholder.png"
import React, {useState} from "react";
import {constants} from "../../constants.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete.js";
import IconButton from "@mui/material/IconButton";
import SkillChipViewer from "../skills/components/SkillChipViewer.jsx";

export default function ProjectCard({project, remove}) {

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
            <Stack direction="row" spacing={2} style={{flexWrap: "wrap", padding: "0 10px"}}>
                {project.skills.slice(0, 5).map((skill) => (
                    <SkillChipViewer skill={skill} key={skill.id}/>
                ))}
            </Stack>
        </Link>
        <CardActions style={{
            width: "100%",
            padding: "0 10px 0 0",
            display: 'flex',
            justifyContent: "flex-end"
        }}>
            <IconButton aria-label="delete"
                        onClick={deleteProject}
                        style={{
                            bottom: 0,
                            right: 0
                        }}>
                <DeleteIcon/>
            </IconButton>
        </CardActions>
    </Card>
}

ProjectCard.propTypes = {
    project: PropTypes.object,
    remove: PropTypes.func,
}
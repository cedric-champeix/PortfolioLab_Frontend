import {Box, Card, CardContent, MenuItem, Select, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/joy";
import placeHolder from "../../assets/icons/placeholder.png"
import React, {useState} from "react";
import {constants} from "../../constants.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SkillChipViewer from "../skills/components/SkillChipViewer.jsx";
import axios from "axios";
import {endpoints} from "../../data/endpoints.js";
import {useConfirmation} from "../../hooks/useConfirmation.js";

const visibilityTypes = {
    PUBLIC: "Public",
    PRIVATE: "Private"
}

export default function ProjectCard({project, remove}) {

    const [image, setImage] = useState(project.MainImage?.path ? constants.BACKEND_URL + "" + project.MainImage.path : placeHolder);
    const [visible, setVisible] = useState(project.visible || false)

    if (!project.skills)
        project.skills = []

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    const updateVisibility = (_visible) => {
        const url = endpoints.projectsEndpoint + "/" + project.id
        axios({
            url: `${url}/visibility`,
            method: "PUT",
            withCredentials: true,
            data: {
                visible: _visible
            }
        }).then(() => {
            setVisible(_visible)
        }).catch((error) => {
            console.error("Error when updating project visibility: ", error)
        })
    }

    const confirm = useConfirmation()

    const confirmRemove = () =>{
        confirm({
            catchOnCancel: true,
            name: `the project ${project.name}`
        }).then(() => {
            remove(project.id)
        })
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
            padding: "5px 10px 5px 0",
            display: 'flex',
            justifyContent: "flex-end"
        }}>
            <Select value={visible ? visibilityTypes.PUBLIC : visibilityTypes.PRIVATE}
                    sx={{height: "3vh"}}>
                <MenuItem value={visibilityTypes.PRIVATE} onClick={() => updateVisibility(false)}>
                    {visibilityTypes.PRIVATE}
                </MenuItem>
                <MenuItem value={visibilityTypes.PUBLIC} onClick={() => updateVisibility(true)}>
                    {visibilityTypes.PUBLIC}
                </MenuItem>
            </Select>
            <IconButton aria-label="delete"
                        onClick={confirmRemove}
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
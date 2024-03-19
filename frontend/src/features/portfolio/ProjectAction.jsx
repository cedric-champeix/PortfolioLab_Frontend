import {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import placeHolder from "../../assets/icons/placeholder.png"
import {constants} from "../../constants.js";
import PropTypes from "prop-types";

export default function ProjectAction({project, create, update, isEditing}) {

    const baseProject = {
        name: "",
        description: ""
    }

    const [projectData, setProjectData] = useState({
        name: project.name ? project.name : baseProject.name,
        description: project.description ? project.description : baseProject.description
    })

    const [image, setImage] = useState([project.MainImage?.path ? constants.BACKEND_URL + "" + project.MainImage.path : placeHolder]);

    //Triggers form toggle
    const [open, setOpen] = useState(false)

    const toggle = (e) => {
        if (!isEditing) {
            setImage([placeHolder])
            setProjectData([baseProject])
        }
        setOpen(!open);
    }

    const handleSubmit = async () => {
        const body = {
            name: projectData.name,
            description: projectData.description
        }

        if (isEditing) {
            update(project.id, null, body)
        } else {
            create(null, body)
        }
        toggle();
    }

    const fallbackImage = () => {
        setImage(placeHolder)
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>New Project</DialogTitle>
                <Box component="form">
                    <DialogContent style={{paddingTop: 0}}>

                        <Box style={{marginBottom: "20px"}}>
                            <TextField
                                autoFocus
                                value={projectData.name}
                                onChange={(e) => {
                                    setProjectData({name: e.target.value, description: projectData.description || ""})
                                }}
                                margin="dense"
                                id="name"
                                name="name"
                                label="Project name"
                                type="text"
                                fullWidth
                                multiline
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                value={projectData.description}
                                onChange={(e) => {
                                    setProjectData({name: projectData.name || "", description: e.target.value})
                                }}
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                variant="standard"
                            />
                        </Box>
                        <Box style={{display: "flex", justifyContent: "center"}}>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{display: "none"}}
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                            />

                            <Button>
                                <label htmlFor="select-image"
                                       style={{
                                           cursor: "pointer",
                                           borderRadius: "10px",
                                           height: "200px",
                                           width: "300px",
                                           overflow: "hidden"
                                       }}>
                                    <Box component={"img"}
                                         style={{
                                             margin: "auto",
                                             minWidth: "100%",
                                             height: "100%"
                                         }}
                                         src={image}
                                         onError={fallbackImage}
                                         alt={"Profile picture preview"}/>
                                </label>
                            </Button>
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        {!isEditing ? <Button
                variant="outlined"
                color="primary"
                onClick={toggle}>
                Create
            </Button> :
            <Button size="small"
                    onClick={toggle}>
                Edit
            </Button>}
    </>
}

ProjectAction.propTypes = {
    project: PropTypes.object,
    create: PropTypes.func,
    update: PropTypes.func,
    isEditing: PropTypes.bool
}
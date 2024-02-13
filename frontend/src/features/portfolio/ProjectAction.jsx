import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {useImage} from "../resume/hooks/useImage.js";
import {constants} from "../../constants.js"

export default function ProjectAction({createProject}) {

    //Form data (title & description)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    //Triggers form toggle
    const [open, setOpen] = useState(false);
    //Image management
    //Link to placeholder image
    const baseImage = "src/assets/icons/placeholder.png"
    //Image upload manager. Change imageLink before upload
    const {imageLink, setImageLink} = useImage(baseImage)

    const [selectedImage, setSelectedImage] = useState(null);
    const [tempImageUrl, setTempImageUrl] = useState(baseImage);

    useEffect(() => {
        if (selectedImage) {
            //DAMIIIIII
            console.log(constants.DAM)
            setTempImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    const toggle = () => {
        setSelectedImage(null)
        setTempImageUrl(imageLink ? imageLink : baseImage)
        setOpen(!open);
    }

    const handleSubmit = async () => {
        console.log("Handle Submit : selected image : " + selectedImage)
        if (selectedImage) {
            createProject(title, description, selectedImage)
        }
        toggle();
    }

    const fallbackImage = () => {
        setImageLink(baseImage)
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>New Project</DialogTitle>
                <Box component="form">
                    <DialogContent>

                        <TextField
                            autoFocus
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            margin="dense"
                            id="title"
                            label="Project name"
                            type="text"
                            fullWidth
                            multiline
                            variant="standard"
                        />

                        <TextField
                            autoFocus
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            margin="dense"
                            id="title"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            variant="standard"
                        />

                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{display: "none"}}
                            onChange={(e) => {
                                setSelectedImage(e.target.files[0])
                            }}
                        />

                        <Button>
                            <label htmlFor="select-image" style={{cursor: "pointer"}}>
                                <Box component={"img"}
                                     border="1px solid #1976d2"
                                     borderRadius="2%"
                                     margin="auto"
                                     width={300}
                                     height={200}
                                     src={tempImageUrl}
                                     onError={fallbackImage}
                                     alt={"Profile picture preview"}/>
                            </label>
                        </Button>
                        <br/>
                        <br/>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        <Button
            variant="outlined"
            color="primary"
            onClick={toggle}
        >
            Create
        </Button>
    </>
}

ProjectAction.propTypes = {
    createProject : () => {}
}
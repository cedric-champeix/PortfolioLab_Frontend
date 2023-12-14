import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, DialogTitle, MenuItem, Select} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {useImage} from "../../../hooks/resume/useImage.js";

export default function ContactAction(props) {

    const baseImage = "src/assets/icons/blank-profile-picture.png"

    const [open, setOpen] = useState(false);
    const {resumeData} = props

    const {imageLink, setImageLink, uploadImage} = useImage()

    const [selectedImage, setSelectedImage] = useState(null);
    const [tempImageUrl, setTempImageUrl] = useState(null);


    useEffect(() => {
        setImageLink(resumeData.image ? "http://localhost:8080/" + resumeData.image : baseImage)
    }, [resumeData])

    useEffect(() => {
        if (selectedImage) {
            setTempImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    const toggle = () => {
        setSelectedImage(null)
        setTempImageUrl(imageLink ? imageLink : baseImage)
        setOpen(!open);
    }

    const handleSubmit = async (e) => {
        if (selectedImage) {
            uploadImage(selectedImage).then((link) => {
                setImageLink("http://localhost:8080/" + link)
            })
        }
        toggle();
    }

    const fallbackImage = () => {
        setImageLink(baseImage)
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>Upload profile picture</DialogTitle>
                <Box component="form">
                    <DialogContent>
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{display: "none"}}
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                        />

                        <Button>
                            <label htmlFor="select-image" style={{cursor: "pointer"}}>
                                <Box component={"img"}
                                     border="1px solid #1976d2"
                                     borderRadius="50%"
                                     margin="auto"
                                     width={200}
                                     height={200}
                                     src={tempImageUrl}
                                     onError={fallbackImage}
                                     alt={"Profile picture preview"}/>
                            </label>
                        </Button>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color={"error"}>Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        <Button>
            <Box onClick={toggle}
                 component={"img"}
                 border="1px solid #1976d2"
                 borderRadius="50%"
                 margin="auto"
                 width={200}
                 height={200}
                 src={imageLink}
                 onError={fallbackImage}
                 alt={"Profile picture"}></Box>
        </Button>
    </>
}
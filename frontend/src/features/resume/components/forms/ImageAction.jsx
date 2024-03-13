import  {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useImage} from "../../hooks/useImage.js";
import {constants} from "../../../../constants.js";

export default function ContactAction({resumeData}) {

    const baseImage = "src/assets/icons/blank-profile-picture.png"

    const [open, setOpen] = useState(false);
    const {imageLink, setImageLink, uploadImage} = useImage()

    const [selectedImage, setSelectedImage] = useState(null);
    const [tempImageUrl, setTempImageUrl] = useState(null);


    useEffect(() => {
        setImageLink(resumeData.image ? constants.BACKEND_URL + resumeData.image : baseImage)
        console.log(resumeData)
    })

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

    const handleSubmit = async () => {
        if (selectedImage) {
            uploadImage(selectedImage).then((link) => {
                setImageLink(constants.BACKEND_URL + link)
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
                                     src={tempImageUrl}
                                     onError={fallbackImage}
                                     alt={"Profile picture preview"}/>
                            </label>
                        </Button>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
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

ContactAction.propTypes = {
    resumeData: {}
}
import {Box, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import placeHolder from "../../../assets/icons/placeholder.png";
import PropTypes from "prop-types";


export default function UploadImage({upload, toggle, callback}) {

    const [uploadData, setUploadData] = useState({"name": "", "image": null})

    const [displayedImage, setDisplayedImage] = useState(uploadData.image ? uploadData.image : placeHolder)

    const fallbackImage = () => {
        setUploadData({"name": uploadData.name, "image": placeHolder})
    }

    const handleSubmit = () => {
        const body = {
            name: uploadData.name
        }

        upload(uploadData.image, body, callback)
        toggle()
    }

    return <Box>
        <Box component="form">
            <DialogContent>
                <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    style={{display: "none"}}
                    onChange={(e) => {
                        setUploadData({...uploadData, "image": e.target.files[0]})
                        setDisplayedImage(URL.createObjectURL(e.target.files[0]))
                    }}
                />
                <Button style={{width: "80%", margin: "auto"}}>
                    <label htmlFor="select-image" style={{cursor: "pointer"}}>
                        <Box component={"img"}
                             width="90%"
                             maxWidth="500px"
                             maxHeight="400px"
                             margin="auto"
                             src={displayedImage}
                             onError={fallbackImage}
                             alt={"Profile picture preview"}/>
                    </label>
                </Button>

                <TextField
                    value={uploadData.name}
                    onChange={(e) => {
                        setUploadData({
                            ...uploadData,
                            name: e.target.value
                        })
                    }}
                    required
                    id="name"
                    type="name"
                    label="Image name"
                    margin="dense"
                    variant="standard"
                    fullWidth
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={toggle} color="error">Close</Button>
                <Button disabled={!uploadData.image} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Box>
    </Box>
}

UploadImage.propTypes = {
    upload: PropTypes.func,
    toggle: PropTypes.func,
    callback: PropTypes.func
}
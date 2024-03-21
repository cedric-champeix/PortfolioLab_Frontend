import Grid from "@mui/material/Grid";
import ImageCard from "./ImageCard.jsx";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import PropTypes from "prop-types";


export default function SelectImage({images, update, remove, toggle, callback}) {

    const [selectedImage, setSelectedImage] = useState()

    const handleSubmit = () => {
        callback(selectedImage)
        toggle()
    }

    return <div>
        <Grid container style={{height: "100%", maxHeight: "75vh", overflow: "auto"}}  sx={{p: 3}} spacing={2}>
            {images.map((image) =>
                <Grid item
                      key={image.id}
                      onClick={() => {
                          setSelectedImage(image)
                      }}>
                    <ImageCard image={image}
                               update={update}
                               remove={remove}
                               selected={image === selectedImage}/>
                </Grid>
            )}
        </Grid>
        <DialogActions>
            <Button onClick={toggle} color="error">Close</Button>
            <Button disabled={!selectedImage} onClick={handleSubmit}>Select</Button>
        </DialogActions>
    </div>

}

SelectImage.propTypes = {
    images: PropTypes.array,
    update: PropTypes.func,
    remove: PropTypes.func,
    toggle: PropTypes.func,
    callback: PropTypes.func
}
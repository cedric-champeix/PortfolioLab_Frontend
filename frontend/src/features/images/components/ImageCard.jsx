import {Box, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/joy";
import ImageAction from "./ImageAction.jsx"
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import placeHolder from "../../../assets/icons/placeholder.png";
import {useState} from "react";
import {constants} from "../../../constants.js";


export default function ImageCard({image, update, remove, selected}) {

    const [imagePath, setImagePath] = useState(image.path ? constants.BACKEND_URL + "" + image.path : placeHolder)

    const fallbackImage = () => {
        setImagePath(placeHolder)
    }

    const deleteImage = () => {
        remove(image.id)
    }

    return <Card sx={{width: 260}} style={selected ? {border: "5px solid #1976d2"} : {}}>
        <Box component={"img"}
             sx={{
                 height: 180,
                 width: "100%",
                 overflow: "hidden"
             }}
             src={imagePath}
             onError={fallbackImage}
             alt={"Project Image"}/>
        <CardContent>
            <Typography variant="body1" color="text.secondary">
                {image.name.length < 25 ? image.name : image.name.slice(0, 25) + "..."}
            </Typography>
        </CardContent>
        <CardActions>
            <ImageAction image={image} update={update} isEditing={true}/>
            <Button size="small"
                    onClick={deleteImage}>
                Delete
            </Button>
        </CardActions>
    </Card>
}

ImageCard.propTypes = {
    image: PropTypes.object,
    update: PropTypes.func,
    remove: PropTypes.func,
    selected: PropTypes.bool
}
import {Box} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import {constants} from "../../../../constants.js";
import Button from "@mui/material/Button";
import placeHolder from "../../../../assets/icons/placeholder.png"
import ImageHandler from "../../../images/components/ImageHandler.jsx";

export default function ImageComponent({component, update}) {

    const [image, setImage] = useState(component.data.image ? constants.BACKEND_URL + "" + component.data.image : placeHolder);

    const [open, setOpen] = useState(false)

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    const toggle = () => {
        setOpen(!open)
    }

    const updateImage = (newImage) => {
        const body = {
            type: component.type,
            data: {
                image: newImage.path
            }
        }

        update(component.id, body)
        setImage(constants.BACKEND_URL + "" + newImage.path)
    }

    return <div>
        <ImageHandler open={open} toggle={toggle} callback={updateImage}/>
        <Button width="80%" onClick={toggle}>
            <Box component={"img"}
                 margin="auto"
                 width="90%"
                 maxWidth="900px"
                 maxHeight="500px"
                 src={image}
                 onError={fallbackImage}
                 alt={"Project Image"}/>
        </Button>
    </div>

}

ImageComponent.propTypes = {
    component: PropTypes.object,
    update: PropTypes.func
}
import {Box} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import {constants} from "../../../../constants.js";
import Button from "@mui/material/Button";
import placeHolder from "../../../../assets/icons/placeholder.png"

export default function ImageComponent({component, update}) {

    // const [data, setData] = useState(component);

    const [image, setImage] = useState(component.data.image ? constants.BACKEND_URL + "" + component.data.image : placeHolder);

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    return <Button width="80%">
        <Box component={"img"}
             margin="auto"
             width="90%"
             maxWidth="900px"
             maxHeight="500px"
             src={image}
             onError={fallbackImage}
             alt={"Project Image"}/>
    </Button>

}

ImageComponent.propTypes = {
    component: PropTypes.object,
    update: PropTypes.func
}
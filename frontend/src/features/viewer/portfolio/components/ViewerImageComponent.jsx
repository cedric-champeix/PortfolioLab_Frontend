import {Box} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import {constants} from "../../../../constants.js";
import placeHolder from "../../../../assets/icons/placeholder.png"

export default function ViewerImageComponent({component}) {

    const [image, setImage] = useState(component.data.image ? constants.BACKEND_URL + "" + component.data.image : placeHolder);

    const fallbackImage = () => {
        setImage(placeHolder)
    }

    return <Box component={"img"}
         margin="auto"
         width="90%"
         maxWidth="900px"
         maxHeight="500px"
         src={image}
         onError={fallbackImage}
         alt={"Project Image"}/>

}

ViewerImageComponent.propTypes = {
    component: PropTypes.object
}
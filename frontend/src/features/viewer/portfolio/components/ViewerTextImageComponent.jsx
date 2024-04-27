import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import {constants} from "../../../../constants.js";
import placeHolder from "../../../../assets/icons/placeholder.png"
import parse from 'html-react-parser';

export default function ViewerTextImageComponent({component, leftText}) {

    const [image, setImage] = useState(component.data.image ? constants.BACKEND_URL + "" + component.data.image : placeHolder);

    const text = parse(component.data.text) || ""

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    return <>
        {leftText ?
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {text}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component={"img"}
                         margin="auto"
                         width="100%"
                         maxWidth="900px"
                         maxHeight="500px"
                         src={image}
                         onError={fallbackImage}
                         alt={"Project Image"}/>
                </Grid>
            </Grid> :
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box component={"img"}
                         margin="auto"
                         width="100%"
                         maxWidth="900px"
                         maxHeight="500px"
                         src={image}
                         onError={fallbackImage}
                         alt={"Project Image"}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    {text}
                </Grid>
            </Grid>
        }
    </>
}

ViewerTextImageComponent.propTypes = {
    component: PropTypes.object,
    leftText: PropTypes.bool
}
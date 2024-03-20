import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import {constants} from "../../../../constants.js";
import Button from "@mui/material/Button";
import placeHolder from "../../../../assets/icons/placeholder.png"
import TextEditor from "../TextEditor.jsx";

export default function TextImageComponent({component, update, leftText}) {

    const [data, setData] = useState(component);

    const [image, setImage] = useState(component.data.image ? constants.BACKEND_URL + "" + component.data.image : placeHolder);

    const save = (event, editor) => {
        let temp = data
        temp.data.text = editor.getContent({format: 'html'})
        update(data.id, temp)
    }

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    return <>
        {leftText ?
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TextEditor text={data.data.text} save={save} height="300px" width="100%"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button>
                        <Box component={"img"}
                             margin="auto"
                             width="100%"
                             maxWidth="900px"
                             maxHeight="500px"
                             src={image}
                             onError={fallbackImage}
                             alt={"Project Image"}/>
                    </Button>
                </Grid>
            </Grid> :
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Button>
                        <Box component={"img"}
                             margin="auto"
                             width="100%"
                             maxWidth="900px"
                             maxHeight="500px"
                             src={image}
                             onError={fallbackImage}
                             alt={"Project Image"}/>
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextEditor text={data.data.text} save={save} height="300px" width="100%"/>
                </Grid>
            </Grid>
        }
    </>
}

TextImageComponent.propTypes = {
    component: PropTypes.object,
    update: PropTypes.func,
    leftText: PropTypes.bool
}
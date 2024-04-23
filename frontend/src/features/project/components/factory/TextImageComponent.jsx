import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import {constants} from "../../../../constants.js";
import Button from "@mui/material/Button";
import placeHolder from "../../../../assets/icons/placeholder.png"
import TextEditor from "../TextEditor.jsx";
import ImageHandler from "../../../images/components/ImageHandler.jsx";

export default function TextImageComponent({component, update, leftText}) {

    const [data, setData] = useState(component);

    const [image, setImage] = useState(component.data.image ? constants.BACKEND_URL + "" + component.data.image : placeHolder);

    const [open, setOpen] = useState(false)

    const saveText = (event, editor) => {
        const body = {
            type: component.type,
            data: {
                image: data.data.image,
                text: editor.getContent({format: 'html'})
            }
        }
        update(data.id, body)
    }

    const updateImage = (newImage) => {
        const body = {
            type: component.type,
            data: {
                image: newImage.path,
                text: data.data.text
            }
        }

        update(component.id, body)
        setImage(constants.BACKEND_URL + "" + newImage.path)
    }

    const fallbackImage = (e) => {
        setImage(placeHolder)
    }

    const toggle = () => {
        setOpen(!open)
    }

    return <>
        {leftText ?
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TextEditor text={data.data.text} save={saveText} height="300px" width="100%"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageHandler open={open} toggle={toggle} callback={updateImage}/>
                    <Button onClick={toggle}>
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
                    <ImageHandler open={open} toggle={toggle} callback={updateImage}/>
                    <Button onClick={toggle}>
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
                    <TextEditor text={data.data.text} save={saveText} height="300px" width="100%"/>
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
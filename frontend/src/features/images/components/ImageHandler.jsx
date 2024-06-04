import React, {useState} from "react";
import {Dialog, Tab, Tabs} from "@mui/material";
import Paper from "@mui/material/Paper";
import TabPanel from "../../../components/TabPanel.jsx";
import SelectImage from "./SelectImage.jsx"
import UploadImage from "./UploadImage.jsx"
import {useImages} from "../hooks/useImages.js";
import PropTypes from "prop-types";

export default function ImageHandler({open, toggle, callback}) {

    const [value, setValue] = useState(0)

    const {images, upload, update, remove} = useImages()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Paper elevation={20}>
        <Dialog open={open}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab style={{width: "50%"}} label="Images"/>

                <Tab style={{width: "50%"}} label="Upload image"/>
            </Tabs>
            <TabPanel value={value} index={0} style={{overflow: "hidden"}}>
                <SelectImage images={images} update={update} remove={remove} toggle={toggle} callback={callback}/>
            </TabPanel>
            <TabPanel value={value} index={1} style={{overflow: "hidden"}}>
                <UploadImage upload={upload} toggle={toggle} callback={callback}/>
            </TabPanel>
        </Dialog>
    </Paper>
}

ImageHandler.propTypes = {
    open: PropTypes.bool,
    toggle: PropTypes.func,
    callback: PropTypes.func
}
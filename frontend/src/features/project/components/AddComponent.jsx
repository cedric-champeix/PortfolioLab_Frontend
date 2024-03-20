import React, {useState} from "react";
import {IoAddCircle} from "react-icons/io5";
import Button from "@mui/material/Button";
import "./css/components.css"
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

export default function AddComponent({create, index, distance}) {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const body = {
            type: formData.get("component"),
            index: index,
            distance: distance,
            data: {}
        }

        await create(body)
        toggle()
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{"Create new component"}</DialogTitle>
                <Box component="form" onSubmit={submitForm} style={{width: "500px"}}>
                    <DialogContent>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Component</FormLabel>
                            <RadioGroup
                                defaultValue="TEXT"
                                name="component"
                                sx={{gap: 1}}
                            >
                                {/*<FormControlLabel value="TEXT" control={<Radio />} label={<img src={ProfilePicture} alt="Text component" width="100px"/>} />*/}
                                <FormControlLabel value="TEXT" control={<Radio/>} label="Text component"/>
                                <FormControlLabel value="IMAGE" control={<Radio/>} label="Image component"/>
                                <FormControlLabel value="TEXT_IMAGE" control={<Radio/>} label="Text-Image component"/>
                                <FormControlLabel value="IMAGE_TEXT" control={<Radio/>} label="Image-Text component"/>
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        <Button style={{width: "100%", borderRadius: "15px"}}
                onClick={toggle}>
            <IoAddCircle size="50px"
                         className="plus-button"/>
        </Button>
    </>
}

AddComponent.propTypes = {
    create: PropTypes.func,
    index: PropTypes.number,
    distance: PropTypes.number
}
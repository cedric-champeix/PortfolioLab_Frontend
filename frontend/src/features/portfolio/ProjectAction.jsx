import {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function ProjectAction({create}) {

    const [projectData, setProjectData] = useState({
        name: ""
    })

    //Triggers form toggle
    const [open, setOpen] = useState(false)

    const toggle = (e) => {
        setProjectData({name: ""})
        setOpen(!open);
    }

    const handleSubmit = async () => {
        const body = {
            name: projectData.name
        }

        create(body)
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>New Project</DialogTitle>
                <Box component="form">
                    <DialogContent style={{paddingTop: 0}}>

                        <Box style={{marginBottom: "20px"}}>
                            <TextField
                                autoFocus
                                required
                                value={projectData.name}
                                onChange={(e) => {
                                    setProjectData({name: e.target.value})
                                }}
                                margin="dense"
                                id="name"
                                name="name"
                                label="Project name"
                                type="text"
                                variant="standard"
                                fullWidth
                                multiline
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        <Button
            variant="outlined"
            color="primary"
            onClick={toggle}>
            Create
        </Button>
    </>
}

ProjectAction.propTypes = {
    create: PropTypes.func
}
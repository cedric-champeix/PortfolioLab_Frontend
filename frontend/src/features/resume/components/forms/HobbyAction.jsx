import {useState} from "react";
import Button from "@mui/material/Button";
import {
    Dialog,
    Box,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function HobbyAction({type, hobbyName, hobbyDescription, hobbyId, resumeId, createHobbie, updateHobbie}) {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({name: hobbyName, description: hobbyDescription});

    const toggle = () => {
        setData({name: hobbyName})
        setOpen(!open);
    }

    const handleSubmit = () => {
        const body = {
            name: data.name,
            description: data.description,
            resumeId: resumeId
        }
        switch (type) {
            case "add":
                createHobbie(body)
                break;
            case "edit":
                updateHobbie(hobbyId, body)
                break;
        }
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit hobby ${hobbyName}` : "Create a hobby"}</DialogTitle>
                <Box component="form">
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={data.name}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    name: e.target.value
                                })
                            }}
                            margin="dense"
                            id="name"
                            label="Hobby"
                            type="name"
                            fullWidth
                            multiline
                            variant="standard"
                        />


                        <TextField
                            autoFocus
                            value={data.description || ""}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    description: e.target.value
                                })
                            }}
                            margin="dense"
                            id="description"
                            label="Skill description"
                            type="name"
                            fullWidth
                            multiline
                            variant="standard"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color={"error"}>Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        <Button
            variant="outlined"
            color="primary"
            onClick={toggle}
        >
            {type === "edit" ? "Edit" : "Create"}
        </Button>
    </>
}
HobbyAction.propTypes = {
    type: PropTypes.string,
    hobbyId: PropTypes.string,
    hobbyName: PropTypes.string,
    hobbyDescription: PropTypes.string,
    resumeId: PropTypes.string,
    createHobbie: PropTypes.func,
    updateHobbie: PropTypes.func
}
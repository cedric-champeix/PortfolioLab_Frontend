import React, {useState} from "react";
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

export default function HobbyAction(props) {

    const [open, setOpen] = useState(false);
    const {type, hobbyName, resumeData, setResumeData, updateResume} = props

    const [data, setData] = useState({name: hobbyName});

    const toggle = () => {
        setData({name: hobbyName})
        setOpen(!open);
    }


    const handleSubmit = () => {
        switch (type) {
            case "add":
                const arr = resumeData.hobbies
                const index = arr.findIndex(hobby => hobby.name === data.name)
                index === -1 ? arr.push(data) : arr[index] = data

                updateResume(
                    resumeData.description,
                    resumeData.languages,
                    arr,
                ).then((data) => {
                    setResumeData({
                        resumeId: data.id,
                        description: data.description,
                        hobbies: data.hobbies,
                        languages: data.languages
                    })
                })
                break;
            case "edit":
                updateResume(
                    resumeData.description,
                    resumeData.languages,
                    resumeData.hobbies.map(hobby =>
                        hobby.name === hobbyName ? data : hobby
                    ),
                ).then((data) => {
                    setResumeData({
                        resumeId: data.id,
                        description: data.description,
                        hobbies: data.hobbies,
                        languages: data.languages
                    })
                })
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
                        <br/>
                        <br/>
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
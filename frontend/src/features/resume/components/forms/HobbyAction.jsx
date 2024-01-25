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

export default function HobbyAction({type, hobbyName, hobbyId, resumeId, createHobbie, updateHobbie}) {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({name: hobbyName});

    const toggle = () => {
        setData({name: hobbyName})
        setOpen(!open);
    }

    const handleSubmit = () => {
        const body = {
            name: data.name,
            description: "lorem ipsum",
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
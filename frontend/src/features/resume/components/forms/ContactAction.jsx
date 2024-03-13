import {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Fab} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {contactTypes} from "../../../../types/contact.js"
import AddIcon from '@mui/icons-material/Add';

export default function ContactAction({
                                          type,
                                          contactId,
                                          contactTitle,
                                          contactText,
                                          resumeId,
                                          createContact,
                                          updateContact
                                      }) {

    const [open, setOpen] = useState(false);

    const [data, setData] = useState({title: contactTitle, text: contactText});

    const toggle = () => {
        setData({title: contactTitle, text: contactText})
        setOpen(!open);
    }


    const handleSubmit = () => {
        const body = {
            title: data.title,
            text: data.text,
            resumeId: resumeId
        }
        console.log(type)
        switch (type) {
            case "edit":
                updateContact(contactId, body)
                break;
            case "add":
                console.log("Add contact")
                createContact(body);
                break;
        }
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit contact ${contactTitle}` : "Create a contact"}</DialogTitle>
                <Box component="form">
                    <DialogContent>
                        <Select value={data.title ? data.title : contactTypes.EMAIL}
                                onChange={(e) => setData({...data, title: e.target.value})}
                                name={"title"}
                                id={"title"}>
                            {
                                Object.values(contactTypes).map((value, i) => (
                                    <MenuItem key={value+i} value={value}>{value}</MenuItem>
                                ))
                            }
                        </Select>
                        <TextField
                            autoFocus
                            value={data.text}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    text: e.target.value
                                })
                            }}
                            margin="dense"
                            id="text"
                            label="Contact text"
                            type="name"
                            fullWidth
                            multiline
                            variant="standard"
                        />
                        <br/>
                        <br/>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>




        {
            type === "edit" ?
                <>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={toggle}
                    >
                        {type === "edit" ? "Edit" : "Create"}
                    </Button>
                </> :
                <>
                    <Fab onClick={toggle} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </>
        }
    </>
}
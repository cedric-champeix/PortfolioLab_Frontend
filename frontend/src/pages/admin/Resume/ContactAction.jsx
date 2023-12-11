import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog,Box, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {contactTypes} from "../../../types/contact.js"

export default function ContactAction(props) {

    const [open, setOpen] = useState(false);
    const {type, contactId, contactTitle, contactText, resumeData, createContact, updateContact} = props

    const [data, setData] = useState({title: contactTitle, text: contactText});

    const toggle = () => {
        setData({title: contactTitle, text: contactText})
        setOpen(!open);
    }


    const handleSubmit = () => {
        switch (type) {
            case "edit":
                updateContact(contactId, data.title, data.text)
                break;
            case "add":
                createContact(data.title, data.text, resumeData.resumeId);
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
                                onChange={(e) => setData({...data, title: e.target.value})} name={"title"}
                                id={"title"} placeholder={"Select level of mastery"}>
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
                            id="description"
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
                        <Button onClick={toggle}>Close</Button>
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
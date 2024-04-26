import {useMemo, useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, Box, DialogActions, DialogContent, IconButton, DialogTitle, MenuItem, Select, Fab} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {contactTypes} from "../../../../types/contact.js"
import AddIcon from '@mui/icons-material/Add';
import {string} from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import {Formik} from "formik";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const baseSchema = Yup.object().shape({
    title: Yup.string().required("required")
})

const emailSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required("Required"),
})

//YUP
const phoneSchema = Yup.object().shape({
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
})

const schemas = {
    Email: emailSchema,
    Phone: phoneSchema
}


const ContactTypeSelect = (value, changeCallback) => {
    return <Select value={value}
                   onChange={(e) => changeCallback(e)}
                   name={"title"}
                   id={"title"}>
        {
            Object.values(contactTypes).map((value, i) => (
                <MenuItem key={value + i} value={value}>{value}</MenuItem>
            ))
        }
    </Select>
}

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

    const [currentContactType, setCurrentContactType] = useState("Email")

    const validationSchema = useMemo(() => {
        console.log("Contact schema changed to " + schemas[currentContactType])
        return baseSchema.shape({
            [currentContactType]: schemas[currentContactType]
        })
    }, [currentContactType]);


    const initialValues = {
        title: currentContactType,
        text: data.text
    }

    const toggle = () => {
        setData({title: contactTitle, text: contactText})
        setOpen(!open);
    }


    const handleSubmit = () => {
        console.log(data)
        const body = {
            title: data.title,
            text: data.text,
            resumeId: resumeId
        }

        if (body.title === '') {
            body.title = 'Email'
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
                    <Formik initialValues={initialValues} validationSchema={validationSchema}>
                        <DialogContent>

                            <Select value={data.title ? data.title : contactTypes.EMAIL}
                                    onChange={(e) => {
                                        setData({...data, title: e.target.value})
                                    }}
                                    name={"title"}
                                    id={"title"}>
                                {
                                    Object.values(contactTypes).map((value, i) => (
                                        <MenuItem key={value + i} value={value}>{value}</MenuItem>
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
                    </Formik>


                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>


        {
            type === "edit" ?
                <IconButton style={{position: 'relative', bottom: '8px'}} aria-label={"edit"} onClick={toggle}>
                    <EditIcon></EditIcon>
                </IconButton>
                :
                <Fab size={"small"} onClick={toggle} color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
        }
    </>
}

ContactAction.propTypes = {
    type: string,
    contactId: string,
    contactTitle: string,
    contactText: string,
    resumeId: string,
    createContact: () => {
    },
    updateContact: () => {
    }
}
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {
    Dialog,
    Box,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import Typography from "@mui/material/Typography";
import {parse, format} from "date-fns";

const onGoing = "ongoing"

export default function ExperienceAction(props) {

    const [open, setOpen] = useState(false);
    const {
        type,
        expTitle,
        expCompany,
        expDescription,
        expStartDate,
        expEndDate,
        createExperience,
        updateExperience
    } = props

    const [data, setData] = useState({
        title: expTitle,
        company: expCompany,
        description: expDescription,
        startDate: expStartDate,
        endDate: expEndDate
    });

    const toggle = () => {
        setData({
            title: expTitle,
            company: expCompany,
            description: expDescription,
            startDate: expStartDate,
            endDate: expEndDate
        })
        setOpen(!open);
    }


    const handleSubmit = () => {
        switch (type) {
            case "edit":
                updateExperience(expTitle, data.title, data.company, data.description, data.startDate, data.endDate || onGoing)
                break;
            case "add":
                createExperience(data.title, data.company, data.description, data.startDate, data.endDate || onGoing);
                break;
        }
        toggle();
    }


    const parseDate = (dateString) => {
        if (dateString === onGoing || !dateString) {
            return null;
        }

        // Set a default day (e.g., 1) to create a valid date
        return parse(dateString, 'MM/yyyy', new Date(0, 0, 1));
    }

    const dateToStr = (date) => {
        if (!date) {
            return null;
        }

        return format(date, "MM/yyyy")
    }

    const maxDate = (date) => {
        if (!date || date === onGoing) {
            return new Date()
        }

        return parseDate(date)
    }

    const minDate = (date) => {
        if (!date) {
            return null
        }

        return parseDate(date)
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit experience ${expTitle}` : "Create an experience"}</DialogTitle>
                <Box component="form">
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={data.company}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    company: e.target.value
                                })
                            }}
                            margin="dense"
                            required
                            id="name"
                            label="Company name"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            value={data.title}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    title: e.target.value
                                })
                            }}
                            margin="dense"
                            required
                            id="name"
                            label="Experience name"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            value={data.description}
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
                        <br/>
                        <br/>

                        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: "start"}}>
                            <div>
                                <Typography color="text.secondary">
                                    Start date:
                                </Typography>
                                <DatePicker
                                    selected={parseDate(data.startDate)}
                                    onChange={(date) =>
                                        setData({
                                            ...data,
                                            startDate: dateToStr(date)
                                        })
                                    }
                                    dateFormat="MM/yyyy"
                                    showIcon
                                    showMonthYearPicker
                                    maxDate={maxDate(data.endDate)}
                                />
                            </div>
                            <div style={{display: 'flex', flexDirection: "column"}}>
                                <Typography color="text.secondary">
                                    End date:
                                </Typography>
                                <DatePicker
                                    selected={parseDate(data.endDate)}
                                    onChange={(date) =>
                                        setData({
                                            ...data,
                                            endDate: dateToStr(date)
                                        })
                                    }
                                    dateFormat="MM/yyyy"
                                    showIcon
                                    showMonthYearPicker
                                    isClearable
                                    maxDate={maxDate(null)}
                                    minDate={minDate(data.startDate)}
                                />
                                <Typography color="text.secondary" fontSize="small">
                                    Leave empty if ongoing
                                </Typography>
                            </div>
                        </div>
                        <br/><br/>
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
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

export default function FormationAction(props) {

    const [open, setOpen] = useState(false);
    const {
        type,
        fFormationName,
        fUniversityName,
        fStartDate,
        fEndDate,
        createFormation,
        updateFormation
    } = props

    const [data, setData] = useState({
        formationName: fFormationName,
        universityName: fUniversityName,
        startDate: fStartDate,
        endDate: fEndDate,
    });

    const toggle = () => {
        setData({
            formationName: fFormationName,
            universityName: fUniversityName,
            startDate: fStartDate,
            endDate: fEndDate,
        })
        setOpen(!open);
    }


    const handleSubmit = () => {
        switch (type) {
            case "edit":
                updateFormation(fFormationName, data.formationName, data.universityName, data.startDate, data.endDate || onGoing)
                break;
            case "add":
                createFormation(data.formationName, data.universityName, data.startDate, data.endDate || onGoing);
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
                <DialogTitle>{type === "edit" ? `Edit formation ${fFormationName}` : "Create a formation"}</DialogTitle>
                <Box component="form">
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={data.formationName}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    formationName: e.target.value
                                })
                            }}
                            margin="dense"
                            required
                            id="name"
                            label="Formation name"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            value={data.universityName}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    universityName: e.target.value
                                })
                            }}
                            margin="dense"
                            required
                            id="name"
                            label="University"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <br/><br/>
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
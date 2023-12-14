import React, {useState} from "react";
import Button from "@mui/material/Button";
import {
    Dialog,
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {languageLevelTypes} from "../../../types/languageLevel.js"

export default function LanguageAction(props) {

    const [open, setOpen] = useState(false);
    const {type, languageName, languageLevel, resumeData, setResumeData, updateResume} = props

    const [data, setData] = useState({name: languageName, level: languageLevel});

    const toggle = () => {
        setData({name: languageName, level: languageLevel})
        setOpen(!open);
    }


    const handleSubmit = () => {
        if (!data.level) {
            data.level = languageLevelTypes.B1
        }

        switch (type) {
            case "add":
                const arr = resumeData.languages
                const index = arr.findIndex(language => language.name === data.name)
                index === -1 ? arr.push(data) : arr[index] = data

                updateResume(
                    resumeData.description,
                    arr,
                    resumeData.hobbies,
                ).then((data) => {
                    setResumeData({
                        resumeId: data.id,
                        description: data.description,
                        hobbies: data.hobbies,
                        languages: data.languages,
                        image: data.image
                    })
                })
                break;
            case "edit":
                updateResume(
                    resumeData.description,
                    resumeData.languages.map(language =>
                        language.name === languageName ? data : language
                    ),
                    resumeData.hobbies,
                ).then((data) => {
                    setResumeData({
                        resumeId: data.id,
                        description: data.description,
                        hobbies: data.hobbies,
                        languages: data.languages,
                        image: data.image
                    })
                })
                break;
        }
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit language ${languageName}` : "Create a language"}</DialogTitle>
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
                            label="Language"
                            type="name"
                            fullWidth
                            multiline
                            variant="standard"
                        />
                        <Select value={data.level ? data.level : languageLevelTypes.B1}
                                onChange={(e) => setData({...data, level: e.target.value})}
                                name={"level"}
                                id={"level"}>
                            {
                                Object.values(languageLevelTypes).map((value, i) => (
                                    <MenuItem key={value + i} value={value}>{value}</MenuItem>
                                ))
                            }
                        </Select>
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
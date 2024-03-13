import {useState} from "react";
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
import {languageLevelTypes} from "../../../../types/languageLevel.js"
import {string} from "prop-types";

export default function LanguageAction({
                                           type,
                                           languageName,
                                           languageId,
                                           languageLevel,
                                           resumeId,
                                           createLanguage,
                                           updateLanguage
                                       }) {

    const [open, setOpen] = useState(false);

    const [data, setData] = useState({name: languageName, level: languageLevel});

    const toggle = () => {
        setData({name: languageName, level: languageLevel})
        setOpen(!open);
    }


    const handleSubmit = () => {
        //Set default level to B1
        if (!data.level) {
            data.level = languageLevelTypes.B1
        }

        const body = {
            name: data.name,
            level: data.level,
            resumeId: resumeId
        }

        switch (type) {
            case "add":
                createLanguage(body)
                break;
            case "edit":
                updateLanguage(languageId, body)
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
                        <Button onClick={toggle} color="error">Close</Button>
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

LanguageAction.propTypes = {
    type: string,
    languageName: string,
    languageId: string,
    languageLevel: string,
    resumeId: string,
    createLanguage: () => {},
    updateLanguage: () => {}

}
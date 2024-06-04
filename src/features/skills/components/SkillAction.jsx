import {
    Box,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import PropTypes, {bool} from "prop-types";
import {useNotification} from "../../../hooks/useNotification.js";


export default function SkillAction({skill, update, open, setOpen}) {

    const [data, setData] = useState({name: skill.name, description: skill.description ? skill.description : "", isSoft: skill.isSoft});
    const notify = useNotification()

    const toggle = () => {
        setData({name: skill.name, description: skill.description ? skill.description : "", isSoft: skill.isSoft})
        setOpen(!open);
    }

    const handleSubmit = () => {
        update(skill.id, data.name, data.description, data.isSoft)
        toggle();
        notify("Skill updated successfully", "success")
    }

    return <div>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{`Edit skill ${skill.name}`}</DialogTitle>
                <Box component="form">
                    <DialogContent style={{width: '400px'}}>
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
                            required
                            id="name"
                            label="Skill name"
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

                        <FormControlLabel control={
                            <Checkbox onChange={() => setData({...data, isSoft: !data.isSoft})}
                                      checked={data.isSoft}/>
                        }
                                          label="Soft Skill"/>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
    </div>
}

SkillAction.propTypes = {
    skill: PropTypes.object,
    update: PropTypes.func,
    open: bool,
    setOpen: PropTypes.func
}
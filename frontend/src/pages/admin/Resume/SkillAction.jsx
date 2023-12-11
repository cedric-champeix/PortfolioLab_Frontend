import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog,Box, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {level} from "../../../types/level.js"

export default function SkillAction(props) {

    const [open, setOpen] = useState(false);
    const {type, skillId, skillName, description, mastery, isSoft, createSkill, updateSkill, resumeData} = props

    const [data, setData] = useState({name: skillName, description: description, mastery: mastery, isSoft: isSoft});

    const toggle = () => {
        setData({name: skillName, description: description, mastery: mastery, isSoft: isSoft})
        setOpen(!open);
    }

    
    const handleSubmit = () => {
        switch (type) {
            case "edit":
                updateSkill(skillId, data.name, data.description, data.mastery, data.isSoft)
                break;
            case "add":
                createSkill(data.name, data.description, data.mastery, data.isSoft, resumeData.resumeId);
                break;
        }
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit skill ${skillName}` : "Create a skill"}</DialogTitle>
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
                            <br/>
                            <br/>

                            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: "center"}}>
                                <Select value={data.mastery ? data.mastery.toLowerCase() : level.BEGINNER}
                                        onChange={(e) => setData({...data, mastery: e.target.value})} name={"mastery"}
                                        id={"mastery"} placeholder={"Select level of mastery"}>
                                    <MenuItem value={level.BEGINNER}>Beginner</MenuItem>
                                    <MenuItem value={level.INTERMEDIATE}>Intermediate</MenuItem>
                                    <MenuItem value={level.ADVANCED}>Advanced</MenuItem>
                                </Select>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={data.isSoft}
                                        onChange={(e) => setData({...data, isSoft: !data.isSoft})}
                                    />
                                    Soft Skill
                                </label>
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
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Dialog,Box, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function EditAddSkill(props) {

    const [open, setOpen] = useState(false);
    const {skillName, description, mastery, isSoft, setSkillsData, skillsData, removeSkill, type, addSkill} = props
    const [data, setData] = useState({name: skillName, description: description, mastery: mastery,isSoft: isSoft});
    const toggle = () => {
        setOpen(!open);
    }

    
    const handleSubmit = () => {
        switch (type) {
            case "edit":
                const temp = skillsData;
                temp.push(data);
                setSkillsData(temp);
                removeSkill(skillName);
                console.log(skillsData);
                console.log("Skill edited : " + skillsData);
                break;
            case "add":
                addSkill(data.name, data.description, data.mastery, data.isSoft);
        }
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit skill ${skillName}` : "Add a skill"}</DialogTitle>
                    <Box component="form">
                <DialogContent>
                    <DialogContentText>
                        Edit your skill
                    </DialogContentText>

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

                            <Select value={data.mastery.toLowerCase() || "beginner"} onChange={(e) => setData({...data, mastery: e.target.value})} name={"mastery"} id={"mastery"} placeholder={"Select level of mastery"} >
                                <MenuItem value={"beginner"}>Beginner</MenuItem>
                                <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                                <MenuItem value={"advanced"}>Advanced</MenuItem>
                            </Select>
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
            {type === "edit" ? "Edit" : "Add a skill"}
        </Button>
    </>
}
import {useState} from "react";
import Button from "@mui/material/Button";
import {
    Dialog,
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    Checkbox,
    FormControlLabel, Chip
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {bool, string} from "prop-types";
import EditIcon from '@mui/icons-material/Edit';

export default function SkillAction({
                                        type,
                                        skillId,
                                        skillName,
                                        description,
                                        mastery,
                                        isSoft,
                                        createSkill,
                                        updateSkill,
                                        resumeId
                                    }) {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({name:  "", description: "", mastery: "", isSoft:  false});

    const toggle = () => {
        setData({name: skillName, description: description, mastery: mastery, isSoft: isSoft})
        setOpen(!open);
    }

    const handleSubmit = () => {
        const body = {
            name: data.name,
            description: data.description,
            isSoft: data.isSoft,
            resumeId: resumeId
        }
        console.log(body)
        switch (type) {
            case "edit":
                updateSkill(skillId, body)
                break;
            case "add":
                createSkill(body);
                break;
        }
        toggle();
    }

    return <>
        <Paper>
            <Dialog open={open}>
                <DialogTitle>{type === "edit" ? `Edit skill ${skillName}` : "Create a skill"}</DialogTitle>
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

                        <br/>
                        <br/>
                        <FormControlLabel control={<Checkbox onChange={() => setData({...data, isSoft: !data.isSoft})} checked={data.isSoft} defaultChecked />} label="Soft Skill" />

                        <br/><br/>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggle} color="error">Close</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Paper>
        {type === "edit" ?

            (<EditIcon style={{marginLeft:'10px'}} onClick={() => {toggle()}}></EditIcon>) :
            <Chip label={"Add"} style={{marginTop: "10px"}} icon={<AddCircleOutlineIcon></AddCircleOutlineIcon>} variant={"outlined"} onClick={toggle}></Chip>
        }
    </>
}

SkillAction.propTypes = {
    type: string,
    skillId: string,
    skillName: string,
    description: string,
    mastery: string,
    isSoft: bool,
    createSkill: () => {},
    updateSkill: () => {},
    resumeId: string


}
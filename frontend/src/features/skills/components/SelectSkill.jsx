import {useState} from "react";
import {DialogActions} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import SkillChipEdit from "./SkillChipEdit.jsx";

export default function SelectSkill({skills, update, remove, toggle, callback}) {

    const [selectedSkill, setSelectedSkill] = useState(null)

    const handleSubmit = () => {
        callback(selectedSkill)
        toggle()
    }

    return <div>
        <Grid container style={{height: "100%", maxHeight: "75vh", overflow: "auto"}}  sx={{p: 3}} spacing={2}>
            {skills.map((skill) =>
                <Grid item
                      key={skill.id}
                      onClick={() => {
                          setSelectedSkill(skill)
                      }}>
                    <SkillChipEdit skill={skill}
                                   update={update}
                                   remove={remove}
                                   selected={skill === selectedSkill}/>
                </Grid>
            )}
        </Grid>
        <DialogActions>
            <Button onClick={toggle} color="error">Close</Button>
            <Button disabled={!selectedSkill} onClick={handleSubmit}>Select</Button>
        </DialogActions>
    </div>

}

SelectSkill.propTypes = {
    skills: PropTypes.array,
    update: PropTypes.func,
    remove: PropTypes.func,
    toggle: PropTypes.func,
    callback: PropTypes.func
}
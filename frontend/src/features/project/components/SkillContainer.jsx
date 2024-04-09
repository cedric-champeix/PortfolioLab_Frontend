import {string} from "prop-types";
import {Chip, Tooltip, Stack} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline.js";
import {React, useState} from "react";
import SkillHandler from "../../skills/components/SkillHandler.jsx";
import {useSkills} from "../../skills/hooks/useSkills.js";

export default function SkillContainer({projectId}) {

    const [open, setOpen] = useState(false)

    console.log("PROJECT", projectId)

    const {fetchSkills, skills, connectToProject, disconnectFromProject} = useSkills(null, projectId || "AWAITING")

    const toggle = () => {
        setOpen(!open)

        if (open) {
            fetchSkills()
        }
    }

    return <div>
        <SkillHandler open={open} toggle={toggle} callback={connectToProject}/>
        <Stack direction="row" spacing={2} style={{flexWrap: "wrap"}}>
            {skills.map((skill) => (
                <Tooltip title={skill.description} key={skill.id} arrow>
                    <Chip label={skill.name} style={{marginTop: "10px"}}
                          onClick={toggle}
                          onDelete={() => disconnectFromProject(skill.id)}
                    />
                </Tooltip>
            ))}
            <Chip label={"Add"}
                  style={{marginTop: "10px"}}
                  icon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
                  variant={"outlined"}
                  onClick={toggle}/>
        </Stack>
    </div>

}

SkillContainer.propTypes = {
    projectId: string
}
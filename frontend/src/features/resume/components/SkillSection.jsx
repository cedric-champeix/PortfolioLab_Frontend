import {Chip, Tooltip, Stack} from "@mui/material";
import {string} from "prop-types";
import Box from "@mui/material/Box";
import React, {useState} from "react";
import SkillHandler from "../../skills/components/SkillHandler.jsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {useSkills} from "../../skills/hooks/useSkills.js";

export default function SkillSection({resumeId}) {

    const [open, setOpen] = useState(false)

    const {fetchSkills, skills, connectToResume, disconnectFromResume} = useSkills(resumeId, null)

    const toggle = () => {
        setOpen(!open)

        if (open) {
            fetchSkills()
        }
    }

    return <Box container marginY="10px">
        <SkillHandler open={open} toggle={toggle} callback={connectToResume}/>
        <Stack direction={"row"} spacing={2} style={{flexWrap: "wrap"}}>
            {skills.map((skill) => (
                <Tooltip title={skill.description} key={skill.id} arrow>
                    <Chip label={skill.name} style={{marginTop: "10px"}}
                          onClick={toggle}
                          onDelete={() => disconnectFromResume(skill.id)}
                    />
                </Tooltip>
            ))}
            <Chip label={"Add"}
                  style={{marginTop: "10px"}}
                  icon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
                  variant={"outlined"}
                  onClick={toggle}/>
        </Stack>

    </Box>
}

SkillSection.propTypes = {
    resumeId: string
}
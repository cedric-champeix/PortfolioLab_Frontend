import {Chip, Tooltip, Stack} from "@mui/material";
import {string} from "prop-types";
import Box from "@mui/material/Box";
import {useState} from "react";
import SkillHandler from "../../skills/components/SkillHandler.jsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {useSkills} from "../../skills/hooks/useSkills.js";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import {useNotification} from "../../../hooks/useNotification.js";

export default function SkillSection({resumeId}) {

    const [open, setOpen] = useState(false)
    const confirm = useConfirmation()
    const notify = useNotification()
    const {fetchSkills, skills, connectToResume, disconnectFromResume} = useSkills(resumeId, null)

    const toggle = () => {
        setOpen(!open)

        if (open) {
            fetchSkills()
        }
    }

    const handleDelete = (skillId) => {

        confirm({
            catchOnCancel: true,
            name: "Resume"
        }).then(() => {
            disconnectFromResume(skillId)
            notify('Skill removed successfully', "success")
        })
    }

    return <Box marginY="10px">
        <SkillHandler open={open} toggle={toggle} callback={connectToResume}/>
        <Stack direction={"row"} spacing={2} style={{flexWrap: "wrap"}}>
            {skills.map((skill) => (
                <Tooltip title={skill.description} key={skill.id} arrow>
                    <Chip label={skill.name} style={{marginTop: "10px"}}
                          onClick={toggle}
                          onDelete={() => {
                              handleDelete(skill.id)
                          }}
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
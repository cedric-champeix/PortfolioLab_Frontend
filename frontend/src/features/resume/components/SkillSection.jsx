import {useCRUD} from "../hooks/useCRUD.js";
import {endpoints} from "../../../data/endpoints.js";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title.jsx";
import {Chip, Tooltip, Stack} from "@mui/material";
import {string} from "prop-types";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import SkillAction from "./forms/SkillAction.jsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
    chipRoot: {
        "& .action": {
            order: 1, // the label has a default order of 0, so this icon goes after the label
            cursor: "pointer"
        },
        "& .MuiChip-deleteIcon": {
            order: 2 // since this is greater than an order of 1, it goes after the icon
        }
    }
});

export default function SkillSection({resumeId}) {

    const classes = useStyles();
    //CRUD on experiences endpoint
    const {update, create, remove, data} = useCRUD(endpoints.skillsEndpoints)
    //Calls the confirmation service
    //This hook will handle a promise and trigger a dialog to perform confirmation
    //Once confirmed by the user, the function executes the callback
    const confirm = useConfirmation()

    console.log(data)

    const removeSafeguard = (resourceId, resourceName) => {

        confirm({
            catchOnCancel: true, name: resourceName
        }).then(() => {
            remove(resourceId).then(() => {
                console.log("Item " + resourceName + " removed")
            })
        })

    }

    return <Box container marginY="10px">

            <Stack direction={"row"} spacing={2} style={{flexWrap: "wrap"}}>
                {data.filter(item => item.isSoft === false).map((skill, i) => (
                    <Tooltip title={skill.description}>
                        <Chip label={skill.name} style={{marginTop: "10px"}}
                              classes={{
                                  root: classes.chipRoot
                              }}
                              onClick={() => {
                              }}
                              onDelete={() => removeSafeguard(skill.id, skill.name)}
                              icon={<SkillAction
                                  className={"action"}
                                  type={"edit"}
                                  style={{marginLeft: "10px"}}
                                  skillId={skill.id}
                                  skillName={skill.name}
                                  isSoft={skill.isSoft}
                                  updateSkill={update}
                                  resumeId={resumeId}></SkillAction>}
                        />
                    </Tooltip>
                ))}
                <SkillAction type={"add"}
                             skillName={""}
                             isSoft={false}
                             createSkill={create}
                             resumeId={resumeId}>Add a skill</SkillAction>
            </Stack>

        <Stack direction={"row"} spacing={2}>
            {data.filter(item => item.isSoft === true).map((skill, i) => (
                <Tooltip title={skill.description}>
                    <Chip label={skill.name}
                          style={{marginTop: "10px"}}
                          classes={{
                              root: classes.chipRoot
                          }}
                          onClick={() => {
                          }}
                          onDelete={() => removeSafeguard(skill.id, skill.name)}
                          icon={<SkillAction
                              className={"action"}
                              type={"edit"}
                              style={{marginLeft: "10px"}}
                              skillId={skill.id}
                              skillName={skill.name}
                              isSoft={skill.isSoft}
                              updateSkill={update}
                              resumeId={resumeId}></SkillAction>}
                    />
                </Tooltip>
            ))}
            <SkillAction type={"add"}
                         skillName={""}
                         isSoft={false}
                         createSkill={create}
                         resumeId={resumeId}>Add a skill</SkillAction>
        </Stack>

    </Box>
}

SkillSection.propTypes = {
    resumeId: string
}
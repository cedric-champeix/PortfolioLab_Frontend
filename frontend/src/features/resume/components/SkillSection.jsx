import {useCRUD} from "../hooks/useCRUD.js";
import {endpoints} from "../../../data/endpoints.js";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title.jsx";
import {Card, CardContent, Chip, Popover, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {truncate} from "../utils/truncate.js";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {string} from "prop-types";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import SkillAction from "./forms/SkillAction.jsx";
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
    chipRoot: {
        "& .MuiChip-icon": {
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
            <Grid item xs={6}>
                <Title>Hard skills</Title>

                <SkillAction type={"add"}
                             skillName={""}
                             description={""}
                             mastery={""}
                             isSoft={false}
                             createSkill={create}
                             resumeId={resumeId}>Add a skill</SkillAction>
            </Grid>
        {data.filter(item => item.isSoft === false).map((skill, i) => (
            <Box item xs={4} key={skill.id + i}>

                <Tooltip title={skill.description}>
                    <Chip label={skill.name}
                          classes={{
                              root: classes.chipRoot
                          }}
                          onClick={() => {
                          }}
                          onDelete={() => removeSafeguard(skill.id, skill.name)}
                          icon={<EditIcon style={{marginRight: "10px"}} onClick={() => console.log("Clicked edit item")}/>}
                    />
                </Tooltip>
                <Popover>

                    <Card style={{
                        height: "200px",
                        margin: "8px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <CardContent style={{padding: "0 0 10px 0"}}>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {skill.isSoft ? "Soft skill" : "Technical skill"}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {skill.name}
                            </Typography>
                            {skill.isSoft ? null : <Typography color="text.secondary">
                                {skill.mastery}
                            </Typography>}
                            <Typography variant="body2">
                                {truncate(skill.description, 60)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <SkillAction type={"edit"}
                                         skillId={skill.id}
                                         skillName={skill.name}
                                         description={skill.description}
                                         mastery={skill.mastery}
                                         isSoft={skill.isSoft}
                                         createSkill={create}
                                         updateSkill={update}
                                         resumeId={resumeId}></SkillAction>
                            <Button onClick={() => removeSafeguard(skill.id, skill.name)}
                                    size="small"
                                    color="error">
                                <img
                                    src={"/src/assets/icons/rubbish_bin.svg"}
                                    alt={"Delete skill"}/>
                            </Button>
                        </CardActions>
                    </Card>
                </Popover>

            </Box>))}
    </Box>

}

SkillSection.propTypes = {
    resumeId: string
}
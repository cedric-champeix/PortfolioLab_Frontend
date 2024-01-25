import {useCRUD} from "../hooks/useCRUD.js";
import {endpoints} from "../../../data/endpoints.js";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title.jsx";
import ExperienceAction from "./forms/ExperienceAction.jsx";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {truncate} from "../utils/truncate.js";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {string} from "prop-types";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import SkillAction from "./forms/SkillAction.jsx";

export default function SkillSection({resumeId}) {

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

    return <Grid container marginY="10px">
        <Grid container marginY="10px">
            <Grid item xs={6}>
                <Title>Skills</Title>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <SkillAction type={"add"}
                             skillName={""}
                             description={""}
                             mastery={""}
                             isSoft={false}
                             createSkill={create}
                             resumeId={resumeId}>Add a skill</SkillAction>
            </Grid>
        </Grid>
        {data.map((skill, i) => (<Grid item xs={4} key={skill.id + i}>
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
            </Grid>))}
    </Grid>

}

SkillSection.propTypes = {
    resumeId: string
}
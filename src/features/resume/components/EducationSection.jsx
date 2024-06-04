import {useCRUD} from "../hooks/useCRUD.js";
import {endpoints} from "../../../data/endpoints.js";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title.jsx";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/joy";
import Button from "@mui/material/Button";
import {string} from "prop-types";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import EducationAction from "./forms/EducationAction.jsx";
import {truncate} from "../utils/truncate.js";

export default function EducationSection({resumeId}) {

    //CRUD on experiences endpoint
    const {update, create, remove, data} = useCRUD(endpoints.educationEndpoint)
    //Calls the confirmation service
    //This hook will handle a promise and trigger a dialog to perform confirmation
    //Once confirmed by the user, the function executes the callback
    const confirm = useConfirmation()

    const removeSafeguard = (resourceId, resourceName) => {
        confirm({
            catchOnCancel: true,
            name: resourceName
        }).then(() => {
            remove(resourceId).then(() => {
                console.log("Item " + resourceName + " removed")
            })
        })
    }

    return  <Grid container marginY="10px">
        <Grid container marginY="10px">
            <Grid item xs={6}>
                <Title>Educations</Title>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <EducationAction type={"add"}
                                 eEducationName={""}
                                 eUniversityName={""}
                                 eStartDate={""}
                                 eEndDate={""}
                                 resumeId={resumeId}
                                 createEducation={create}>
                    New education
                </EducationAction>
            </Grid>
        </Grid>
        {
            data.map((education) => (
                <Grid item xs={4} key={education.id}>
                    <Card style={{
                        height: "200px",
                        margin: "8px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <CardContent style={{padding: "0 0 10px 0"}}>
                            <Typography variant="h5" component="div">
                                {education.formationName}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                {education.universityName}
                            </Typography>
                            <Typography color="text.secondary">
                                {education.startDate} - {education.endDate}
                            </Typography>
                            <Typography variant="body2">
                                {truncate(education.description, 60)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <EducationAction type={"edit"}
                                             eId={education.id}
                                             eEducationName={education.formationName}
                                             eUniversityName={education.universityName}
                                             eDescription={education.description}
                                             eStartDate={education.startDate}
                                             eEndDate={education.endDate}
                                             resumeId={resumeId}
                                             updateEducation={update}></EducationAction>
                            <Button
                                onClick={() => removeSafeguard(education.id, education.formationName)}
                                size="small"
                                color="error">
                                <img src={"/src/assets/icons/rubbish_bin.svg"}
                                     alt={"Delete education"}/>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
    </Grid>

}

EducationSection.propTypes = {
    resumeId: string
}
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
import ContactAction from "./forms/ContactAction.jsx";
import FormationAction from "./forms/FormationAction.jsx";

export default function FormationSection({resumeId}) {

    //CRUD on experiences endpoint
    const {update, create, remove, data} = useCRUD(endpoints.formationEndpoint)
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
                <Title>Formations</Title>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <FormationAction type={"add"}
                                 fFormationName={""}
                                 fUniversityName={""}
                                 fStartDate={""}
                                 fEndDate={""}
                                 resumeId={resumeId}
                                 createFormation={create}>
                    Add a formation
                </FormationAction>
            </Grid>
        </Grid>
        {
            data.map((formation, i) => (
                <Grid item xs={4} key={formation.id + i}>
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
                                {formation.formationName}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                {formation.universityName}
                            </Typography>
                            <Typography color="text.secondary">
                                {formation.startDate} - {formation.endDate}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <FormationAction type={"edit"}
                                             fId={formation.id}
                                             fFormationName={formation.formationName}
                                             fUniversityName={formation.universityName}
                                             fStartDate={formation.startDate}
                                             fEndDate={formation.endDate}
                                             resumeId={resumeId}
                                             updateFormation={update}></FormationAction>
                            <Button
                                onClick={() => removeSafeguard(formation.id, formation.formationName, "formation")}
                                size="small"
                                color="error">
                                <img src={"/src/assets/icons/rubbish_bin.svg"}
                                     alt={"Delete formation"}/>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
    </Grid>

}

FormationSection.propTypes = {
    resumeId: string
}
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
import HobbyAction from "./forms/HobbyAction.jsx";
import {truncate} from "../utils/truncate.js";

export default function HobbySection({resumeId}) {

    //CRUD on experiences endpoint
    const {update, create, remove, data} = useCRUD(endpoints.hobbiesEndpoint)
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

    return <Grid container marginY="10px">
        <Grid container marginY="10px">
            <Grid item xs={6}>
                <Title>Hobbies</Title>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <HobbyAction type={"add"}
                             hobbyName={""}
                             resumeId={resumeId}
                             hobbieData={data}
                             createHobby={create}>
                    Add a hobby
                </HobbyAction>
            </Grid>
        </Grid>
        {
            data.map((hobby, i) => (
                <Grid item xs={3} key={hobby.name + i}>
                    <Card style={{
                        height: "150px",
                        margin: "8px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <CardContent style={{padding: "0 0 10px 0"}}>
                            <Typography variant="h5" component="div">
                                {hobby.name}
                            </Typography>
                            <Typography variant="body2">
                                {truncate(hobby.description, 60)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <HobbyAction type={"edit"}
                                         hobbyName={hobby.name}
                                         hobbyDescription={hobby.description}
                                         hobbyId={hobby.id}
                                         resumeId={resumeId}
                                         updateHobby={update}></HobbyAction>
                            <Button onClick={() => removeSafeguard(hobby.id, hobby.name)}
                                    size="small"
                                    color="error">
                                <img src={"/src/assets/icons/rubbish_bin.svg"}
                                     alt={"Delete hobby"}/>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
    </Grid>


}

HobbySection.propTypes = {
    resumeId: string
}
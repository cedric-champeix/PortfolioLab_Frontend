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

export default function ContactSection({resumeId}) {

    //CRUD on experiences endpoint
    const {update, create, remove, data} = useCRUD(endpoints.contactsEndpoint)
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
                <Title>Contacts</Title>
            </Grid>
            <Grid item xs={6} textAlign={"right"}>
                <ContactAction type={"add"}
                               contactTitle={""}
                               contactText={""}
                               createContact={create}
                               resumeId={resumeId}></ContactAction>
            </Grid>
        </Grid>

        {
            data.map((contact, i) => (
                <Grid item xs={4} key={contact.id + i}>
                    <Card style={{
                        height: "170px",
                        margin: "8px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <CardContent style={{padding: "0 0 10px 0"}}>
                            <Typography variant="h5" component="div">
                                {contact.title}
                            </Typography>
                            <Typography color="text.secondary">
                                {contact.text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ContactAction type={"edit"}
                                           contactId={contact.id}
                                           contactTitle={contact.title}
                                           contactText={contact.text}
                                           updateContact={update}
                                           resumeId={resumeId}></ContactAction>
                            <Button onClick={() => removeSafeguard(contact.id, contact.title)}
                                    size="small"
                                    color="error">
                                <img src={"/src/assets/icons/rubbish_bin.svg"}
                                     alt={"Delete contact"}/>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))
        }
    </Grid>

}

ContactSection.propTypes = {
    resumeId: string
}
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import Typography from "@mui/material/Typography";
import {IconButton, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import MailIcon from '@mui/icons-material/Mail';
import {useEffect} from "react";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import Button from "@mui/material/Button";
import ContactAction from "./forms/ContactAction.jsx";
import {string} from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Contact({id, type, text, remove, contactActionElement}) {

    //Calls the confirmation service
    //This hook will handle a promise and trigger a dialog to perform confirmation
    //Once confirmed by the user, the function executes the callback
    const confirm = useConfirmation()

    const confirmRemove = () =>{

        confirm({
            catchOnCancel: true,
            name: text
        }).then(() => {
            remove(id).then()
        })
    }


    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://cdn.jsdelivr.net/gh/Rapsssito/github-profile-badge@latest/src/widget.min.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    console.log(type)
    const ContactIcon = () => {
        switch (type) {
            case "Email":
                return (<MailIcon></MailIcon>)
            case "Phone":
                return (<LocalPhoneIcon></LocalPhoneIcon>)
            case "Address":
                return (<HomeIcon></HomeIcon>)
            case "Website":
                return (<LinkIcon></LinkIcon>)
            case "GitHub":
                return (<GitHubIcon></GitHubIcon>)
            case "LinkedIn":
                return (<LinkedInIcon></LinkedInIcon>)
        }
    }

    return <Stack spacing={1} direction={"row"}>

        <ContactIcon></ContactIcon>
        <Typography >{text}</Typography>
        <IconButton
            style={{position: 'relative', bottom: '8px'}}
                onClick={() => confirmRemove()}
                size="small"
                color="error">
            <DeleteIcon style={{fill:'#941616'}}></DeleteIcon>
        </IconButton>
        {contactActionElement}

    </Stack>
}


Contact.propTypes= {
    id: string,
    type: string,
    text: string,
    remove: () => {},
    contactActionElement: () => {}
}
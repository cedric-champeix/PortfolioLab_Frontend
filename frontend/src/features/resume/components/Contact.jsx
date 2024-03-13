import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Padding} from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useEffect} from "react";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import Button from "@mui/material/Button";
import {useCRUD} from "../hooks/useCRUD.js";
import {endpoints} from "../../../data/endpoints.js";
export default function Contact({id, type, text, remove}) {

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
                return (<EmailIcon></EmailIcon>)
            case "Phone":
                return (<LocalPhoneIcon></LocalPhoneIcon>)
            case "Address":
                return (<HomeIcon></HomeIcon>)
            case "Website":
                return (<LinkIcon></LinkIcon>)
            case "GitHub":
                return (<div className="github-profile-badge" data-user={text}></div>
                )
            case "LinkedIn":
                return (<LinkedInIcon></LinkedInIcon>)
        }
    }

    return <Stack spacing={1} direction={"row"}>

        <ContactIcon></ContactIcon>
        <Typography>{text}</Typography>
        <Button
                onClick={() => confirmRemove()}
                size="small"
                color="error">
            <img src={"/src/assets/icons/rubbish_bin.svg"}
                 alt={"Delete contact"}/>
        </Button>
    </Stack>
}
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import React from "react";
import {contactTypes} from "../../../../types/contact.js";
import PropTypes from "prop-types";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function ContactFactory({contact}) {
    switch (contact.title) {
        case contactTypes.EMAIL:
            return <React.Fragment>
                <MailIcon/>
                <Link href={contact.text} variant="body2" color="inherit" underline="always">
                    {contact.text}
                </Link>
            </React.Fragment>
        case contactTypes.PHONE:
            return <React.Fragment>
                <LocalPhoneIcon/>
                <Typography variant="body2">{contact.text}</Typography>
            </React.Fragment>
        case contactTypes.ADDRESS:
            return <React.Fragment>
                <HomeIcon/>
                <Typography variant="body2">{contact.text}</Typography>
            </React.Fragment>
        case contactTypes.WEBSITE:
            return <React.Fragment>
                <LinkIcon/>
                <Link href={contact.text} variant="body2" color="inherit" underline="always">
                    {contact.text}
                </Link>
            </React.Fragment>
        case contactTypes.LINKEDIN:
            return <React.Fragment>
                <GitHubIcon/>
                <Link href={contact.text} variant="body2" color="inherit" underline="always">
                    {contact.text}
                </Link>
            </React.Fragment>
        case contactTypes.GITHUB:
            return <React.Fragment>
                <LinkedInIcon/>
                <Link href={contact.text} variant="body2" color="inherit" underline="always">
                    {contact.text}
                </Link>
            </React.Fragment>
        default:
            return
    }
}

ContactFactory.propTypes = {
    contact: PropTypes.object
}


export default function ResumeContacts({contacts}) {


    return <Stack direction="row"
                  divider={<Divider orientation="vertical" flexItem/>}
                  spacing={1}
                  flexWrap="wrap">

        {contacts.map((contact) => (
            <Stack key={contact.id}
                   spacing={1}
                   direction="row"
                   alignItems="center">
                {ContactFactory({contact: contact})}
            </Stack>))}

    </Stack>
}
ResumeContacts.propTypes = {
    contacts: PropTypes.array
}
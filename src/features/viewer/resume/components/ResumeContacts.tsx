import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { ContactTypes } from '../../../../types/contact.ts';
import { Contact } from '../../../../types/entities/Contact.ts';

interface FactoryProps {
  contact: Contact;
}

const ContactFactory: React.FunctionComponent<FactoryProps> = ({ contact }) => {
  switch (contact.title) {
    case ContactTypes.EMAIL:
      return (
        <>
          <MailIcon />
          <Link
            href={contact.text}
            variant="body2"
            color="inherit"
            underline="always"
          >
            {contact.text}
          </Link>
        </>
      );
    case ContactTypes.PHONE:
      return (
        <>
          <LocalPhoneIcon />
          <Typography variant="body2">{contact.text}</Typography>
        </>
      );
    case ContactTypes.ADDRESS:
      return (
        <>
          <HomeIcon />
          <Typography variant="body2">{contact.text}</Typography>
        </>
      );
    case ContactTypes.WEBSITE:
      return (
        <>
          <LinkIcon />
          <Link
            href={contact.text}
            variant="body2"
            color="inherit"
            underline="always"
          >
            {contact.text}
          </Link>
        </>
      );
    case ContactTypes.LINKEDIN:
      return (
        <>
          <LinkedInIcon />
          <Link
            href={contact.text}
            variant="body2"
            color="inherit"
            underline="always"
          >
            {contact.text}
          </Link>
        </>
      );
    case ContactTypes.GITHUB:
      return (
        <>
          <GitHubIcon />
          <Link
            href={contact.text}
            variant="body2"
            color="inherit"
            underline="always"
          >
            {contact.text}
          </Link>
        </>
      );
    default:
      return;
  }
};

interface Props {
  contacts: Contact[];
}

export const ResumeContacts: React.FunctionComponent<Props> = ({
  contacts,
}) => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      flexWrap="wrap"
    >
      {contacts.map((contact) => (
        <Stack key={contact.id} spacing={1} direction="row" alignItems="center">
          {ContactFactory({ contact: contact })}
        </Stack>
      ))}
    </Stack>
  );
};

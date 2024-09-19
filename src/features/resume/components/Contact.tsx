import React, { ReactNode, useEffect } from 'react';
import { IconButton, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirmation } from '../../../hooks/useConfirmation.ts';
import { ContactTypes } from '../../../types/contact.ts';

interface Props {
  id: string,
  type: ContactTypes,
  text: string,
  remove: (id: string) => void,
  contactActionElement: ReactNode,
}

const ContactIcon = ({ type }: {type: string}) => {
  switch (type) {
    case 'Email':
      return <MailIcon />;
    case 'Phone':
      return <LocalPhoneIcon />;
    case 'Address':
      return <HomeIcon />;
    case 'Website':
      return <LinkIcon />;
    case 'GitHub':
      return <GitHubIcon />;
    case 'LinkedIn':
      return <LinkedInIcon />;
  }
};

export const Contact: React.FunctionComponent<Props> = ({
                                                          id,
                                                          type,
                                                          text,
                                                          remove,
                                                          contactActionElement,
                                                        }) => {
  //Calls the confirmation service
  //This hook will handle a promise and trigger a dialog to perform confirmation
  //Once confirmed by the user, the function executes the callback
  const confirm = useConfirmation();

  const confirmRemove = () => {
    confirm({
      catchOnCancel: true,
      name: text,
    }).then(() => {
      remove(id);
    });
  };

  useEffect(() => {
    const script = document.createElement('script');

    script.src =
      'https://cdn.jsdelivr.net/gh/Rapsssito/github-profile-badge@latest/src/widget.min.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <Stack spacing={1} direction={'row'}>
    <ContactIcon type={type}></ContactIcon>
    <Typography>{text}</Typography>
    <IconButton
      style={{ position: 'relative', bottom: '8px' }}
      onClick={() => confirmRemove()}
      size="small"
      color="error"
    >
      <DeleteIcon style={{ fill: '#941616' }}></DeleteIcon>
    </IconButton>
    {contactActionElement}
  </Stack>;
};

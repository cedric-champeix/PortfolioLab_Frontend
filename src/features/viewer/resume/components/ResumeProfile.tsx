import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
  profile: string;
}

export const ResumeProfile: React.FunctionComponent<Props> = ({ profile }) => {
  return (
    <Box width="100%" display={profile ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Profile
      </Typography>
      <Divider />
      <Box sx={{ padding: '3mm' }}>
        <Typography variant="body1">{profile}</Typography>
      </Box>
    </Box>
  );
};

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Hobby } from '../../../../types/entities/Hobby.ts';

interface Props {
  hobbies: Hobby[];
}

export const ResumeHobbies: React.FunctionComponent<Props> = ({ hobbies }) => {
  return (
    <Box width="100%" display={hobbies.length !== 0 ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Hobbies
      </Typography>
      <Divider />
      <Stack sx={{ padding: '3mm' }} spacing={0}>
        {hobbies.map((hobby) => (
          <Typography key={hobby.id} variant="body1">
            <Box component="span" sx={{ fontWeight: '600' }}>
              {hobby.name}:{' '}
            </Box>{' '}
            {hobby.description}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

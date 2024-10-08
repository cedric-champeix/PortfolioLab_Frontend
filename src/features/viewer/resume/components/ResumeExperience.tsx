import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Experience } from '../../../../types/entities/Experience.ts';

interface Props {
  experiences: Experience[];
}

export const ResumeExperience: React.FunctionComponent<Props> = ({
  experiences,
}) => {
  return (
    <Box width="100%" display={experiences.length !== 0 ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Experiences
      </Typography>
      <Divider />
      <Stack sx={{ padding: '3mm' }} spacing={2}>
        {experiences.map((experience) => (
          <Box key={experience.id}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6">
                <Box component="span" color="primary.main">
                  {experience.title}
                </Box>{' '}
                - {experience.company}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: '600' }}>
                {experience.startDate} -{' '}
                {experience.endDate ? experience.endDate : 'ongoing'}
              </Typography>
            </Grid>
            <Typography
              variant="body1"
              display={experience.description ? 'block' : 'none'}
            >
              {experience.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

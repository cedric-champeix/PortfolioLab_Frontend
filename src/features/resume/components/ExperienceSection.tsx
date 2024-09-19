import { CardActions } from '@mui/joy';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import Title from '../../../components/Title.tsx';
import { endpoints } from '../../../data/endpoints.ts';
import { useConfirmation } from '../../../hooks/useConfirmation.ts';
import { ActionTypes } from '../../../types/ActionTypes.ts';
import { useCRUD } from '../hooks/useCRUD.ts';
import { truncate } from '../utils/truncate.ts';
import { ExperienceAction } from './forms/ExperienceAction.tsx';

interface Props {
  resumeId: string;
}

export const ExperienceSection: React.FunctionComponent<Props> = ({
  resumeId,
}) => {
  //CRUD on experiences endpoint
  const { update, create, remove, data } = useCRUD(
    endpoints.experienceEndpoint
  );
  //Calls the confirmation service
  //This hook will handle a promise and trigger a dialog to perform confirmation
  //Once confirmed by the user, the function executes the callback
  const confirm = useConfirmation();

  const removeSafeguard = (resourceId: string, resourceName: string) => {
    confirm({
      catchOnCancel: true,
      name: resourceName,
    }).then(() => {
      remove(resourceId).then(() => {
        console.log('Item ' + resourceName + ' removed');
      });
    });
  };

  return (
    <Grid container marginY="10px">
      <Grid container marginY="10px">
        <Grid item xs={6}>
          <Title>Experiences</Title>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <ExperienceAction
            type={ActionTypes.ADD}
            expTitle={''}
            expCompany={''}
            expDescription={''}
            expStartDate={''}
            expEndDate={''}
            resumeId={resumeId}
            create={create}
          />
        </Grid>
      </Grid>

      {data.map((experience, i) => (
        <Grid item xs={4} key={experience.id + i}>
          <Card
            style={{
              height: '200px',
              margin: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent style={{ padding: '0 0 10px 0' }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {experience.company}
              </Typography>
              <Typography variant="h5" component="div">
                {experience.title}
              </Typography>
              <Typography color="text.secondary">
                {experience.startDate} - {experience.endDate}
              </Typography>
              <Typography variant="body2">
                {truncate(experience.description, 60)}
              </Typography>
            </CardContent>
            <CardActions>
              <ExperienceAction
                type={ActionTypes.EDIT}
                expId={experience.id}
                expTitle={experience.title}
                expCompany={experience.company}
                expDescription={experience.description}
                expStartDate={experience.startDate}
                expEndDate={experience.endDate}
                resumeId={resumeId}
                update={update}
              />
              <Button
                onClick={() => removeSafeguard(experience.id, experience.title)}
                size="small"
                color="error"
              >
                <img
                  src={'/src/assets/icons/rubbish_bin.svg'}
                  alt={'Delete experience'}
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

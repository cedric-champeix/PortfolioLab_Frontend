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
import { HobbyAction } from './forms/HobbyAction.tsx';

interface Props {
  resumeId: string;
}

export const HobbySection: React.FunctionComponent<Props> = ({ resumeId }) => {
  //CRUD on experiences endpoint
  const { update, create, remove, data } = useCRUD(endpoints.hobbiesEndpoint);
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
          <Title>Hobbies</Title>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <HobbyAction
            type={ActionTypes.ADD}
            hobbyName={''}
            hobbyDescription={''}
            resumeId={resumeId}
            createHobby={create}
          />
        </Grid>
      </Grid>
      {data.map((hobby, i) => (
        <Grid item xs={3} key={hobby.name + i}>
          <Card
            style={{
              height: '150px',
              margin: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent style={{ padding: '0 0 10px 0' }}>
              <Typography variant="h5" component="div">
                {hobby.name}
              </Typography>
              <Typography variant="body2">
                {truncate(hobby.description, 60)}
              </Typography>
            </CardContent>
            <CardActions>
              <HobbyAction
                type={ActionTypes.EDIT}
                hobbyName={hobby.name}
                hobbyDescription={hobby.description}
                hobbyId={hobby.id}
                resumeId={resumeId}
                updateHobby={update}
              />
              <Button
                onClick={() => removeSafeguard(hobby.id, hobby.name)}
                size="small"
                color="error"
              >
                <img
                  src={'/src/assets/icons/rubbish_bin.svg'}
                  alt={'Delete hobby'}
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

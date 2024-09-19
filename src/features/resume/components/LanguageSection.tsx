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
import { LanguageAction } from './forms/LanguageAction.tsx';

interface Props {
  resumeId: string;
}

export const LanguageSection: React.FunctionComponent<Props> = ({
  resumeId,
}) => {
  //CRUD on experiences endpoint
  const { update, create, remove, data } = useCRUD(endpoints.languageEndpoint);
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
          <Title>Languages</Title>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <LanguageAction
            type={ActionTypes.ADD}
            languageName={''}
            languageLevel={''}
            resumeId={resumeId}
            createLanguage={create}
          />
        </Grid>
      </Grid>
      {data.map((language, i) => (
        <Grid item xs={3} key={language.name + i}>
          <Card
            style={{
              height: '140px',
              margin: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent style={{ padding: '0 0 10px 0' }}>
              <Typography variant="h5" component="div">
                {language.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {language.level}
              </Typography>
            </CardContent>
            <CardActions>
              <LanguageAction
                type={ActionTypes.EDIT}
                languageId={language.id}
                languageName={language.name}
                languageLevel={language.level}
                resumeId={resumeId}
                createLanguage={create}
                updateLanguage={update}
              />
              <Button
                onClick={() => removeSafeguard(language.id, language.name)}
                size="small"
                color="error"
              >
                <img
                  src={'/src/assets/icons/rubbish_bin.svg'}
                  alt={'Delete language'}
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

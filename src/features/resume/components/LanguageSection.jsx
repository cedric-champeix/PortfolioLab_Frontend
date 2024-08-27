import React from 'react'
import { useCRUD } from '../hooks/useCRUD.js'
import { endpoints } from '../../../data/endpoints.js'
import Grid from '@mui/material/Grid'
import Title from '../../../components/Title.jsx'
import { Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/joy'
import Button from '@mui/material/Button'
import { string } from 'prop-types'
import { useConfirmation } from '../../../hooks/useConfirmation.js'
import LanguageAction from './forms/LanguageAction.jsx'

export default function LanguageSection({ resumeId }) {
  //CRUD on experiences endpoint
  const { update, create, remove, data } = useCRUD(endpoints.languageEndpoint)
  //Calls the confirmation service
  //This hook will handle a promise and trigger a dialog to perform confirmation
  //Once confirmed by the user, the function executes the callback
  const confirm = useConfirmation()

  const removeSafeguard = (resourceId, resourceName) => {
    confirm({
      catchOnCancel: true,
      name: resourceName,
    }).then(() => {
      remove(resourceId).then(() => {
        console.log('Item ' + resourceName + ' removed')
      })
    })
  }

  return (
    <Grid container marginY="10px">
      <Grid container marginY="10px">
        <Grid item xs={6}>
          <Title>Languages</Title>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <LanguageAction
            type={'add'}
            languageName={''}
            languageLevel={''}
            resumeId={resumeId}
            createLanguage={create}
            updateLanguage={create}
          >
            Add a language
          </LanguageAction>
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
                type={'edit'}
                languageId={language.id}
                languageName={language.name}
                languageLevel={language.level}
                resumeId={resumeId}
                createLanguage={create}
                updateLanguage={update}
              ></LanguageAction>
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
  )
}

LanguageSection.propTypes = {
  resumeId: string,
}

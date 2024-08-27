import React from 'react'
import { useCRUD } from '../hooks/useCRUD.js'
import { endpoints } from '../../../data/endpoints.js'
import Grid from '@mui/material/Grid'
import Title from '../../../components/Title.jsx'
import Typography from '@mui/material/Typography'
import { string } from 'prop-types'
import ContactAction from './forms/ContactAction.jsx'
import Contact from './Contact.jsx'

export default function ContactSection({ resumeId }) {
  //CRUD on experiences endpoint
  const { update, create, remove, data } = useCRUD(endpoints.contactsEndpoint)
  //Calls the confirmation service
  //This hook will handle a promise and trigger a dialog to perform confirmation
  //Once confirmed by the user, the function executes the callback

  return (
    <React.Fragment>
      {data.length === 0 ? (
        <Grid container marginY="10px" spacing={1} alignItems="center">
          <Grid item>
            <Typography>No Contacts. Add one !</Typography>
          </Grid>
          <Grid item>
            <ContactAction
              type={'add'}
              contactTitle={''}
              contactText={''}
              createContact={create}
              resumeId={resumeId}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container marginY="10px">
          <Grid container marginY="10px">
            <Grid item xs={11.5}>
              <Title>Contacts</Title>
            </Grid>
            <Grid item alignItems={'right'}>
              <ContactAction
                type={'add'}
                contactTitle={''}
                contactText={''}
                createContact={create}
                resumeId={resumeId}
              ></ContactAction>
            </Grid>
          </Grid>

          {data.map((contact, i) => (
            <Grid item xs={12} key={contact.id + i}>
              <Contact
                remove={remove}
                id={contact.id}
                type={contact.title}
                text={contact.text}
                contactActionElement={
                  <ContactAction
                    type={'edit'}
                    contactId={contact.id}
                    contactTitle={contact.title}
                    contactText={contact.text}
                    updateContact={update}
                    resumeId={resumeId}
                  />
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  )
}

ContactSection.propTypes = {
  resumeId: string,
}

import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Avatar } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import * as Yup from 'yup'

export default function Profile() {
  const paperStyle = { padding: 20, width: 400, margin: '0 auto' }
  const headerStyle = { margin: 0 }
  const fieldStyle = { marginBottom: '8px' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnStyle = { margin: '8px 0' }

  //FORMIK INITIAL VALUES
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }

  //YUP
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('required'),
    lastName: Yup.string().required('required'),
    username: Yup.string().required('required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
    password: Yup.string().required('required'),
    confirmPassword: Yup.string().required('required'),
  })

  return (
    <Box
      gridAutoFlow="row"
      className={'Element-'}
      component="main"
      sx={{
        backgroundColor: '#FFF',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2 style={headerStyle}>Edit account</h2>
          </Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => submitForm(values, props)}
          >
            {(props) => (
              <Form>
                <Grid style={fieldStyle} container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      helperText={<ErrorMessage name={'firstName'} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      helperText={<ErrorMessage name={'lastName'} />}

                      //{...register('lastName')}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    style={fieldStyle}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={<ErrorMessage name={'email'} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    style={fieldStyle}
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    helperText={<ErrorMessage name={'username'} />}
                  />
                </Grid>

                <Grid style={fieldStyle} container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      helperText={<ErrorMessage name={'password'} />}

                      // {...register('password')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="confirmPassword"
                      label="Confirm"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      helperText={<ErrorMessage name={'password'} />}

                      // {...register('confirmPassword')}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={btnStyle}
                  fullWidth
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Box>
  )
}

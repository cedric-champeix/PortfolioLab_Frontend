import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface Props {}

export const Profile: React.FunctionComponent<Props> = () => {
  const paperStyle = { padding: 20, width: 400, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const fieldStyle = { marginBottom: '8px' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  //FORMIK INITIAL VALUES
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

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
  });

  const submitForm = (values: any, props: any) => {
    console.log(values, props);
  };

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
          <Grid alignItems="center" justifyContent="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2 style={headerStyle}>Edit account</h2>
          </Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
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
                  disabled={props.isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={btnStyle}
                  fullWidth
                >
                  {props.isSubmitting ? 'Loading...' : 'Apply'}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Box>
  );
};

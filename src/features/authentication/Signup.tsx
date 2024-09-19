import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth.ts';
import { useNotification } from '../../hooks/useNotification.ts';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const paperStyle = { padding: 20, width: 400, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const fieldStyle = { marginBottom: '8px' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const { setUsername } = useAuth();
  const navigate = useNavigate();

  const { notify } = useNotification();
  //FORMIK INITIAL VALUES
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const usernameRegex = /^\w+$/;

  // Form validation with Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('required'),
    lastName: Yup.string().required('required'),
    username: Yup.string()
      .required('required')
      .matches(
        usernameRegex,
        'Username can only contain digits, uppercase and lowercase letters'
      ),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('required'),
    password: Yup.string().required('required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords must match'
    ),
  });

  // @ts-ignore
  const submitForm = async (
    values: SignUpFormValues,
    props: FormikHelpers<SignUpFormValues>
  ) => {
    const data = {
      email: values.email.trim(),
      pwd: values.password.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      username: values.username.trim(),
    };

    axios({
      url: 'http://localhost:8080/signup/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        const token = Cookies.get('jwt_token');

        if (token !== '' || token !== undefined) {
          localStorage.setItem('justAuthenticated', 'true');
          localStorage.setItem('userId', res.data.result.user.id);
          localStorage.setItem('username', res.data.result.user.username);
          setUsername(res.data.result.user.username);
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          notify('User already exists', 'error');
        } else {
          notify('Unknown error', 'error');
        }
      });
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid
          container
          component={'div'}
          direction="column"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid style={fieldStyle} container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    required
                    autoFocus
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                  {errors.firstName && touched.firstName && (
                    <Typography variant="caption" color="error">
                      {errors.firstName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                  {errors.lastName && touched.lastName && (
                    <Typography variant="caption" color="error">
                      {errors.lastName}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    style={fieldStyle}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  {errors.email && touched.email && (
                    <Typography variant="caption" color="error">
                      {errors.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    style={fieldStyle}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                  />
                  {errors.username && touched.username && (
                    <Typography variant="caption" color="error">
                      {errors.username}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  {errors.password && touched.password && (
                    <Typography variant="caption" color="error">
                      {errors.password}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Typography variant="caption" color="error">
                      {errors.confirmPassword}
                    </Typography>
                  )}
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
  );
};

export default Signup;

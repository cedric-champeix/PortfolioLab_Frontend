import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth.ts';
import { useNotification } from '../../hooks/useNotification.ts';

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const paperStyle = {
    padding: 20,
    height: '73vh',
    width: 400,
    margin: '0 auto',
  };
  const fieldStyle = { marginBottom: '8px' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  // Triggers notifications
  const { notify } = useNotification();

  //FORMIK
  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };

  //YUP
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Required'),
    password: Yup.string().required(),
  });

  const { setUsername } = useAuth();
  const navigate = useNavigate();

  const submitForm = (
    values: LoginFormValues,
    props: FormikHelpers<LoginFormValues>
  ) => {
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 1000);

    const body = {
      email: values.email,
      pwd: values.password,
    };

    axios({
      url: 'http://localhost:8080/login/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: body,
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
        if (err.response.status === 401) {
          console.log('User incorrect email or password');
          notify('User incorrect email or password', 'error');

          // setIncorrectUser(true)
          // setTimeout(() => {
          //   setIncorrectUser(false)
          // }, 2000)
        } else if (err.response.status.includes('5')) {
          console.log('Server internal error');
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                style={fieldStyle}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={<ErrorMessage name={'email'} />}
              />
              <Field
                as={TextField}
                style={fieldStyle}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={<ErrorMessage name={'password'} />}
              />
              <Button
                disabled={props.isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
                style={btnStyle}
                fullWidth
              >
                {props.isSubmitting ? 'Loading...' : 'Sign in'}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

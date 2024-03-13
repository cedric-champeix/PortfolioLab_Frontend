import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Alert, Avatar, Checkbox, FormControlLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Link from "@mui/material/Link";
import {useAuth} from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {Form, Formik, Field, ErrorMessage} from 'formik'
import {useState} from "react";
import * as Yup from 'yup'
import {useNotification} from "../../hooks/useNotification.js";

const Login = ({handleChange}) => {

    const paperStyle = {padding: 20, height: '73vh', width: 400, margin: "0 auto"}
    const fieldStyle = {marginBottom: '8px'}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const btnStyle = {margin: '8px 0'}

    // Triggers notifications
    const notify = useNotification();

    //FORMIK
    const initialValues = {
        email: "",
        password: "",
        remember: false
    }

    //YUP
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email').required("Required"),
        password: Yup.string().required()
    })

    const {setUsername} = useAuth()
    const navigate = useNavigate();

    const submitForm = async (values, props) => {


        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 1000)

        const body = {
            email: values.email,
            pwd: values.password
        }


        try {
            axios.defaults.withCredentials = true
            const fetch = await axios({
                url: "http://localhost:8080/login/",
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                data: body
            });

            if (fetch.status === 200) {
                const token = Cookies.get("jwt_token");
                if (token !== "" || token !== undefined) {
                    localStorage.setItem("justAuthenticated", "true");
                    setUsername(fetch.data.result.user.username);
                    navigate("/");
                }
            }
        } catch (e) {

            if(e.response.status === 401) {
                console.log("User incorrect email or password")
                notify("User incorrect email or password", "error")

                setIncorrectUser(true)
                setTimeout(() => {
                    setIncorrectUser(false)
                },2000)
            } else if(e.response.status.includes("5")) {
                console.log("Server internal error")
            }

        }
        //const res = fetch.data;

        //Debug
        console.log(fetch);

    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOpenOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues}
                        onSubmit={(values, props) => submitForm(values, props)}
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
                                helperText={<ErrorMessage name={"email"}/>}
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
                                helperText={<ErrorMessage name={"password"}/>}

                            />
                            <Field as={FormControlLabel}
                                control={
                                    <Checkbox
                                        name="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button disabled={props.isSubmitting} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>{props.isSubmitting ? "Loading..." : "Sign in" }</Button>

                        </Form>
                    )}
                </Formik>

                <Typography>
                    <Link href="#">
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography> Do you have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
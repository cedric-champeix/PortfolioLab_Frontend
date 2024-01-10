import {useAuth} from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function Login() {

    const {setCurrentJwt} = useAuth()
    const navigate = useNavigate();
    //const {handleSubmit} = useForm({
    //  resolver: yupResolver(registerSchema)
    //});


    const submitForm = async (ev) => {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        //Data comes here
        const data = {
            email: formData.get("email"),
            pwd:formData.get("password")
        }

        axios.defaults.withCredentials= true
        const fetch = await axios({
            url: "http://localhost:8080/login/",
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            data : data
        });

        if(fetch.status === 200) {
            const token = Cookies.get("jwt_token");
            console.log(Cookies.get('jwt_token'))
            console.log(Cookies)
            if(token !== "" || token !== undefined) {
                setCurrentJwt(token);
                navigate("/");
            }
        } else {
            //Error
            //Add an error message with react hook form
        }
        //const res = fetch.data;

        //Debug
        console.log(fetch);

    }

    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <img alt={"Portfolio Lab logo"} width={64} style={{borderRadius: "8px"}}
                 src={'/src/assets/logos/logo.png'}></img>
            <Typography component="h1" variant="h5">
                Sign in to PortfolioLab
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={(ev) => submitForm(ev)}
                sx={{mt: 3}}
            >
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            // {...register('email')}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            // {...register('password')}

                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign in
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/register" variant="body2">
                            You do not have an account? Register
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
}
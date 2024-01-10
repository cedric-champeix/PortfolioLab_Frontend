import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import Cookies from "js-cookie";
import {useAuth} from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

export default function Register() {

    const {setCurrentJwt} = useAuth()
    const navigate = useNavigate();

    // const {} = useForm({
    //     resolver: yupResolver(registerSchema)
    // });

    const submitForm = async (ev) => {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        //Data comes here
        const data = {
            email: formData.get("email"),
            pwd: formData.get("password"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            username: formData.get("username")
        }

        const fetch = await axios({
            url: "http://localhost:8080/signup/",
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            data: data
        });
        const res = fetch.data;
        console.log(res);

        const token = Cookies.get("jwt_token");
        switch (fetch.status) {
            case 200:
                if (token !== "" || token !== undefined) {
                    setCurrentJwt(token);
                    navigate("/");
                }
                break;
            case 409:
                //error catch
                break;
        }
        //Debug
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
                Sign up to PortfolioLab
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={(ev) => submitForm(ev)}
                sx={{mt: 3}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            //{...register('lastName')}

                        />
                    </Grid>
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
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="email"
                            // {...register('email')}

                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            // {...register('password')}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            // {...register('confirmPassword')}

                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Register
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
}
import React from 'react';
import SignInUpContainer from "../features/authentication/SignInUpContainer.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App() {
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
                <SignInUpContainer/>
            </Box></Container>


}

export default App;
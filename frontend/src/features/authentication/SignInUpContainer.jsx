import React, {useState} from 'react'
import Paper from "@mui/material/Paper";
import {Tab, Tabs} from "@mui/material";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SignInUpContainer = () => {

    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = {width: 400, margin: "20px auto"}

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Paper elevation={20} style={paperStyle}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab style={{width: "200px"}} label="Sign In"/>

                <Tab style={{width: "200px"}} label="Sign Up"/>
            </Tabs>
            <TabPanel  value={value} index={0}>
                <Login handleChange={handleChange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Signup/>
            </TabPanel>
        </Paper>

    )
}

export default SignInUpContainer;
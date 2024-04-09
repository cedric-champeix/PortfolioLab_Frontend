import React, {useState} from 'react'
import Paper from "@mui/material/Paper";
import {Tab, Tabs} from "@mui/material";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import TabPanel from "../../components/TabPanel.jsx";

const SignInUpContainer = () => {

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = {width: 400, margin: "20px auto"}


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
            <TabPanel value={value} index={0}>
                <Login/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Signup/>
            </TabPanel>
        </Paper>

    )
}

export default SignInUpContainer;
import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";


export default function TabPanel(props) {
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
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    props: PropTypes.object,
    value: PropTypes.number,
    index: PropTypes.number,
    children: PropTypes.func
}
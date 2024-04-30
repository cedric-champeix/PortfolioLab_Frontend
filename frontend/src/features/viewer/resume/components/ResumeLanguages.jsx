import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";
import {Chip, Stack} from "@mui/material";


export default function ResumeLanguages({languages}) {

    return <Box width="100%" display={languages.length !== 0 ? "block" : "none"}>
        <Typography variant="h4" color="primary">Languages</Typography>
        <Divider/>
        <Stack sx={{padding: '3mm'}} direction="row" spacing={1}>
            {languages.map((language) => (

                <Chip key={language.id} label={
                    <Typography variant="body1" sx={{fontWeight: "600"}}>
                        {language.name}: {language.level}
                    </Typography>}/>
            ))}
        </Stack>
    </Box>
}
ResumeLanguages.propTypes = {
    languages: PropTypes.array
}
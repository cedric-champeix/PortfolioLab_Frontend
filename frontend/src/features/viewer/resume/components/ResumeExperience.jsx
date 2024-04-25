import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";


export default function ResumeExperience({experiences}) {

    return <Box width="100%" display={experiences ? "block" : "none"}>
        <Typography variant="h4" color="primary">Experiences</Typography>
        <Divider/>
        <Stack sx={{padding: '3mm'}} spacing={2}>
            {experiences.map((experience) => (
                <Box key={experience.id}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            <Box component="span" color="primary.main">{experience.title}</Box> - {experience.company}
                        </Typography>

                        <Typography variant="body1"
                                    sx={{fontWeight: "600"}}>
                            {experience.startDate} - {experience.endDate ? experience.endDate : "ongoing"}
                        </Typography>
                    </Grid>
                    <Typography variant="body1" display={experience.description ? "block" : "none"}>
                        {experience.description}
                    </Typography>
                </Box>
            ))}
        </Stack>
    </Box>
}
ResumeExperience.propTypes = {
    experiences: PropTypes.array
}
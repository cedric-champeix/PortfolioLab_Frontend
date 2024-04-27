import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";


export default function ResumeEducation({educations}) {

    return <Box width="100%" display={educations.length !== 0 ? "block" : "none"}>
        <Typography variant="h4" color="primary">Educations</Typography>
        <Divider/>
        <Stack sx={{padding: '3mm'}} spacing={2}>
            {educations.map((education) => (
                <Box key={education.id}>

                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            <Box component="span" color="primary.main">{education.formationName}</Box> - {education.universityName}
                        </Typography>

                        <Typography variant="body1"
                                    sx={{fontWeight: "600"}}>
                            {education.startDate} - {education.endDate ? education.endDate : "ongoing"}
                        </Typography>
                    </Grid>

                    <Typography variant="body1" display={education.description ? "block" : "none"}>
                        {education.description}
                    </Typography>
                </Box>
            ))}
        </Stack>
    </Box>
}
ResumeEducation.propTypes = {
    educations: PropTypes.array
}
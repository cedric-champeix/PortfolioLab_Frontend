import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";


export default function ResumeFormation({formations}) {

    return <Box width="100%" display={formations ? "block" : "none"}>
        <Typography variant="h4" color="primary">Formations</Typography>
        <Divider/>
        <Stack sx={{padding: '3mm'}} spacing={2}>
            {formations.map((formation) => (
                <Box key={formation.id}>

                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            <Box component="span" color="primary.main">{formation.formationName}</Box> - {formation.universityName}
                        </Typography>

                        <Typography variant="body1"
                                    sx={{fontWeight: "600"}}>
                            {formation.startDate} - {formation.endDate ? formation.endDate : "ongoing"}
                        </Typography>
                    </Grid>

                    <Typography variant="body1" display={formation.description ? "block" : "none"}>
                        {formation.description}
                    </Typography>
                </Box>
            ))}
        </Stack>
    </Box>
}
ResumeFormation.propTypes = {
    formations: PropTypes.array
}
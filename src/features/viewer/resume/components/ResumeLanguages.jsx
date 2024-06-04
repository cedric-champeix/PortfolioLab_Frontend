import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import {Chip} from "@mui/material";


export default function ResumeLanguages({languages}) {

    return <Box width="100%" display={languages.length !== 0 ? "block" : "none"}>
        <Typography variant="h4" color="primary">Languages</Typography>
        <Divider/>
        <Box sx={{padding: '3mm', display: 'flex', gap: 1, flexWrap: 'wrap'}}>
            {languages.map((language) => (
                <Chip key={language.id} label={
                    <Typography variant="body1" sx={{fontWeight: "600"}}>
                        {language.name}: {language.level}
                    </Typography>}/>
            ))}
        </Box>
    </Box>
}
ResumeLanguages.propTypes = {
    languages: PropTypes.array
}
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ResumeContacts from "./components/ResumeContacts.jsx";
import IconButton from "@mui/material/IconButton";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline.js";
import profilePlaceHolder from "../../../assets/icons/blank-profile-picture.png";
import {constants} from "../../../constants.js";
import ResumeProfile from "./components/ResumeProfile.jsx";
import ResumeExperience from "./components/ResumeExperience.jsx";
import ResumeFormation from "./components/ResumeFormation.jsx";
import ResumeSkills from "./components/ResumeSkills.jsx";
import ResumeLanguages from "./components/ResumeLanguages.jsx";
import ResumeHobbies from "./components/ResumeHobbies.jsx";
import { useReactToPrint } from 'react-to-print';


export default function BaseResume({userResume}) {

    const [image, setImage] = useState(profilePlaceHolder);

    const fallbackImage = () => {
        setImage(profilePlaceHolder);
    }

    useEffect(() => {
        setImage(userResume.resume.Image ? constants.BACKEND_URL + userResume.resume.Image.path : profilePlaceHolder)
    }, [userResume]);

    function capitalize(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const myRef = React.createRef();

    const handlePrint = useReactToPrint({
        content: () => myRef.current,
        documentTitle: userResume.firstName + "_" + userResume.lastName + "_CV"
    });

    return <React.Fragment>
        <Paper elevation={12}
               sx={{
                   width: '210mm', // A4 width
                   margin: '4vh auto'
               }}>

            <Box component="div"
                 ref={myRef}
                 sx={{
                     padding: '5mm',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center'
                 }}>
                <Box bgcolor="primary.main"
                     color="white"
                     sx={{width: '100%', padding: "5mm", borderRadius: "3mm"}}>
                    <Grid container justifyContent="space-between" marginBottom="4mm">
                        <Grid item xs={9} flexDirection="column">
                            <Typography variant="h4" marginBottom="3mm">
                                {capitalize(userResume.firstName) + " " + capitalize(userResume.lastName)}
                            </Typography>
                            <Typography variant="h5">
                                {capitalize(userResume.resume.title)}
                            </Typography>
                        </Grid>

                        <Grid item xs={3} alignItems="center" justifyContent="center">
                            <Avatar src={image}
                                    alt={capitalize(userResume.firstName)}
                                    sx={{height: '35mm', width: '35mm'}}
                                    onError={fallbackImage}/>
                        </Grid>
                    </Grid>
                    <ResumeContacts contacts={userResume.resume.contacts}/>
                </Box>
                <Box sx={{
                    width: "100%",
                    padding: '5mm 3mm', // Adjust padding as needed
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <ResumeProfile profile={userResume.resume.description}/>
                    <ResumeExperience experiences={userResume.resume.experiences}/>
                    <ResumeFormation formations={userResume.resume.formations}/>
                    <ResumeSkills skills={userResume.resume.skills}/>
                    <ResumeLanguages languages={userResume.resume.languages}/>
                    <ResumeHobbies hobbies={userResume.resume.hobbies}/>
                </Box>
            </Box>


        </Paper>

        <IconButton variant="contained"
                    color="primary"
                    sx={{position: "fixed", bottom: "4%", right: "4%"}}
                    onClick={() => handlePrint()}>
            <DownloadForOfflineIcon sx={{fontSize: "70px"}}/>
        </IconButton>
    </React.Fragment>
}
BaseResume.propTypes = {
    userResume: PropTypes.object
}
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { ReactInstance, useCallback, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import profilePlaceHolder from '../../../assets/icons/blank-profile-picture.png';
import { constants } from '../../../constants.ts';
import { ResumeContacts } from './components/ResumeContacts.tsx';
import { ResumeEducation } from './components/ResumeEducation.tsx';
import { ResumeExperience } from './components/ResumeExperience.tsx';
import { ResumeHobbies } from './components/ResumeHobbies.tsx';
import { ResumeLanguages } from './components/ResumeLanguages.tsx';
import { ResumeProfile } from './components/ResumeProfile.tsx';
import { ResumeSkills } from './components/ResumeSkills.tsx';

interface Props {
  userResume: Record<string, any>;
}

export const BaseResume: React.FunctionComponent<Props> = ({ userResume }) => {
  const [image, setImage] = useState(profilePlaceHolder);

  const fallbackImage = useCallback(() => {
    setImage(profilePlaceHolder);
  }, []);

  useEffect(() => {
    setImage(
      userResume.resume.Image
        ? constants.BACKEND_URL + userResume.resume.Image.path
        : ''
    );
  }, [userResume]);

  function capitalize(str: string | null) {
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const myRef = React.createRef<ReactInstance>();

  const handlePrint = useReactToPrint({
    content: () => myRef.current,
    documentTitle: userResume.firstName + '_' + userResume.lastName + '_CV',
  });

  return (
    <>
      <Paper
        elevation={12}
        sx={{
          width: '210mm', // A4 width
          margin: '4vh auto',
        }}
      >
        <Box
          component="div"
          ref={myRef}
          sx={{
            padding: '5mm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            bgcolor="primary.main"
            color="white"
            sx={{
              width: '100%',
              padding: '5mm',
              borderRadius: '3mm',
            }}
          >
            <Grid container justifyContent="space-between" marginBottom="4mm">
              <Grid item xs={image ? 9 : 12} flexDirection="column">
                <Typography variant="h4" marginBottom="3mm">
                  {capitalize(userResume.firstName) +
                    ' ' +
                    capitalize(userResume.lastName)}
                </Typography>
                <Typography variant="h5">
                  {capitalize(userResume.resume.title)}
                </Typography>
              </Grid>

              <Grid
                item
                xs={image ? 3 : 0}
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={image}
                  alt={capitalize(userResume.firstName)}
                  sx={{
                    height: '35mm',
                    width: '35mm',
                    display: image ? 'block' : 'none',
                  }}
                  onError={fallbackImage}
                />
              </Grid>
            </Grid>
            <ResumeContacts contacts={userResume.resume.contacts} />
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: '5mm 3mm', // Adjust padding as needed
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ResumeProfile profile={userResume.resume.description} />
            <ResumeExperience experiences={userResume.resume.experiences} />
            <ResumeEducation educations={userResume.resume.formations} />
            <ResumeSkills skills={userResume.resume.skills} />
            <ResumeLanguages languages={userResume.resume.languages} />
            <ResumeHobbies hobbies={userResume.resume.hobbies} />
          </Box>
        </Box>
      </Paper>
      {/* @ts-ignore */}
      <IconButton
        variant="contained"
        color="primary"
        sx={{ position: 'fixed', bottom: '4%', right: '4%' }}
        onClick={() => handlePrint()}
      >
        <DownloadForOfflineIcon sx={{ fontSize: '70px' }} />
      </IconButton>
    </>
  );
};

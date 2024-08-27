import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

export default function ResumeProfile({ profile }) {
  return (
    <Box width="100%" display={profile ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Profile
      </Typography>
      <Divider />
      <Box sx={{ padding: '3mm' }}>
        <Typography variant="body1">{profile}</Typography>
      </Box>
    </Box>
  )
}
ResumeProfile.propTypes = {
  profile: PropTypes.string,
}

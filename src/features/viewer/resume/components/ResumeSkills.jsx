import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'

export default function ResumeSkills({ skills }) {
  return (
    <Box width="100%" display={skills.length !== 0 ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Skills
      </Typography>
      <Divider />
      <Stack sx={{ padding: '3mm' }} spacing={0}>
        {skills.map((skill) => (
          <Typography key={skill.id} variant="body1">
            <Box component="span" sx={{ fontWeight: '600' }}>
              {skill.name}:{' '}
            </Box>{' '}
            {skill.description}
          </Typography>
        ))}
      </Stack>
    </Box>
  )
}
ResumeSkills.propTypes = {
  skills: PropTypes.array,
}

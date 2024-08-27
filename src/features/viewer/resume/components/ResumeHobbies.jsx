import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'

export default function ResumeHobbies({ hobbies }) {
  return (
    <Box width="100%" display={hobbies.length !== 0 ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Hobbies
      </Typography>
      <Divider />
      <Stack sx={{ padding: '3mm' }} spacing={0}>
        {hobbies.map((hobby) => (
          <Typography key={hobby.id} variant="body1">
            <Box component="span" sx={{ fontWeight: '600' }}>
              {hobby.name}:{' '}
            </Box>{' '}
            {hobby.description}
          </Typography>
        ))}
      </Stack>
    </Box>
  )
}
ResumeHobbies.propTypes = {
  hobbies: PropTypes.array,
}

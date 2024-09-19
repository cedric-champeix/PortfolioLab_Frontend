import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Skill } from '../../../../types/entities/Skill.ts'

interface Props {
  skills: Skill[]
}

export const ResumeSkills: React.FunctionComponent<Props> = ({ skills }) => {
  return <Box width="100%" display={skills.length !== 0 ? 'block' : 'none'}>
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
}

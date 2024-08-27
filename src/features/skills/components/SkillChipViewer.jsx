import { Chip, Tooltip } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

export default function SkillChipViewer({ skill }) {
  return (
    <Tooltip title={skill.description} key={skill.id} arrow>
      <Chip label={skill.name} style={{ marginTop: '10px' }} />
    </Tooltip>
  )
}

SkillChipViewer.propTypes = {
  skill: PropTypes.object,
}

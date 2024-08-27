import React from 'react'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import Box from '@mui/material/Box'

export default function ViewerTextComponent({ component }) {
  const text = parse(component.data.text || '')

  return <Box sx={{ width: '100%' }}>{text}</Box>
}

ViewerTextComponent.propTypes = {
  component: PropTypes.object,
}

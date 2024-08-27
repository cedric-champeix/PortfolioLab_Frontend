import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import PropTypes from 'prop-types'

import ViewerTextComponent from './components/ViewerTextComponent.jsx'
import ViewerImageComponent from './components/ViewerImageComponent.jsx'
import ViewerTextImageComponent from './components/ViewerTextImageComponent.jsx'

export default function ViewerComponentFactory({ component }) {
  const renderComponent = () => {
    switch (component.type) {
      case 'TEXT':
        return <ViewerTextComponent component={component} />
      case 'IMAGE':
        return <ViewerImageComponent component={component} />
      case 'TEXT_IMAGE':
        return (
          <ViewerTextImageComponent component={component} leftText={true} />
        )
      case 'IMAGE_TEXT':
        return (
          <ViewerTextImageComponent component={component} leftText={false} />
        )
      default:
        return (
          <Grid container padding="20px 20px" spacing={2}>
            <Typography variant="body1" color="primary">
              Reload...
            </Typography>
          </Grid>
        )
    }
  }

  return (
    <Grid
      container
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0',
      }}
    >
      {renderComponent()}
    </Grid>
  )
}

ViewerComponentFactory.propTypes = {
  component: PropTypes.object,
}

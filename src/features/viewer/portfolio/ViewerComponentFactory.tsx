import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { ViewerTextComponent } from './components/ViewerTextComponent.tsx'
import { ViewerImageComponent } from './components/ViewerImageComponent.tsx'
import { ViewerTextImageComponent } from './components/ViewerTextImageComponent.tsx'
import { Component } from '../../../types/entities/Component.ts'

interface Props {
  component: Component
}

export const ViewerComponentFactory: React.FunctionComponent<Props> = ({ component }) => {
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

  return <Grid
    container
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 0',
    }}
  >
    {renderComponent()}
  </Grid>
}

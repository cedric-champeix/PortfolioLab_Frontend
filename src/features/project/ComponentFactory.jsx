import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import PropTypes from 'prop-types'

import TextComponent from './components/factory/TextComponent.jsx'
import ImageComponent from './components/factory/ImageComponent.jsx'
import TextImageComponent from './components/factory/TextImageComponent.jsx'
import { useConfirmation } from '../../hooks/useConfirmation.js'

export default function ComponentFactory({ component, update, remove }) {
  const confirm = useConfirmation()

  const confirmRemove = (image) => {
    confirm({
      catchOnCancel: true,
      name: `the image ${image.name}`,
    }).then(() => {
      remove(component.id)
    })
  }

  const renderComponent = () => {
    switch (component.type) {
      case 'TEXT':
        return <TextComponent component={component} update={update} />
      case 'IMAGE':
        return <ImageComponent component={component} update={update} />
      case 'TEXT_IMAGE':
        return (
          <TextImageComponent
            component={component}
            update={update}
            leftText={true}
          />
        )
      case 'IMAGE_TEXT':
        return (
          <TextImageComponent
            component={component}
            update={update}
            leftText={false}
          />
        )
      default:
        return (
          <Grid container padding="20px 20px" spacing={2}>
            <Typography variant={'body1'} color="primary">
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
        borderBottom: 'black dashed 2px',
        // borderTop: "black dashed 2px"
      }}
    >
      {renderComponent()}
      <Grid
        item
        style={{
          width: '100%',
          padding: '15px 15px 0 0',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          aria-label="delete"
          onClick={confirmRemove}
          style={{
            bottom: 0,
            right: 0,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

ComponentFactory.propTypes = {
  component: PropTypes.object,
  update: PropTypes.func,
  remove: PropTypes.func,
}

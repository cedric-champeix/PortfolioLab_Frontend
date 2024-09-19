import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import parse from 'html-react-parser'
import { constants } from '../../../../constants.ts'
import placeHolder from '../../../../assets/icons/placeholder.png'
import { Component } from '../../../../types/entities/Component.ts'

interface Props {
  component: Component,
  leftText: boolean
}

export const ViewerTextImageComponent: React.FunctionComponent<Props> = ({ component, leftText }) => {
  const [image, setImage] = useState(
    component.data.image
      ? constants.BACKEND_URL + '' + component.data.image
      : placeHolder,
  )

  const text = parse(component.data.text || '')

  const fallbackImage = () => {
    setImage(placeHolder)
  }

  return <>
    {leftText ? (
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {text}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box
            component={'img'}
            margin="auto"
            width="100%"
            maxWidth="900px"
            maxHeight="500px"
            src={image}
            onError={fallbackImage}
            alt={'Project Image'}
          />
        </Grid>
      </Grid>
    ) : (
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box
            component={'img'}
            margin="auto"
            width="100%"
            maxWidth="900px"
            maxHeight="500px"
            src={image}
            onError={fallbackImage}
            alt={'Project Image'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {text}
        </Grid>
      </Grid>
    )}
  </>
}
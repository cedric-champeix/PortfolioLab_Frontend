import React, { useState } from 'react'
import { Box } from '@mui/material'
import placeHolder from '../../../../assets/icons/placeholder.png'
import { constants } from '../../../../constants.ts'
import { Component } from '../../../../types/entities/Component.ts'

interface Props {
  component: Component
}

export const ViewerImageComponent: React.FunctionComponent<Props> = ({ component }) => {
  const [image, setImage] = useState(
    component.data.image
      ? constants.BACKEND_URL + '' + component.data.image
      : placeHolder,
  )

  const fallbackImage = () => {
    setImage(placeHolder)
  }

  return <Box
    component={'img'}
    margin="auto"
    width="90%"
    maxWidth="900px"
    maxHeight="500px"
    src={image}
    onError={fallbackImage}
    alt={'Project Image'}
  />
}

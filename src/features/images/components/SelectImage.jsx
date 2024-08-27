import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import ImageCard from './ImageCard.jsx'
import { DialogActions } from '@mui/material'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

export default function SelectImage({
  images,
  update,
  remove,
  toggle,
  callback,
}) {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleSubmit = () => {
    callback(selectedImage)
    toggle()
  }

  return (
    <React.Fragment>
      {images.length === 0 && (
        <Typography margin="25px">You did not upload any image yet.</Typography>
      )}
      <Grid
        container
        style={{ height: '100%', maxHeight: '75vh', overflow: 'auto' }}
        sx={{ p: 3 }}
        spacing={2}
      >
        {images.map((image) => (
          <Grid
            item
            key={image.id}
            onClick={() => {
              if (selectedImage && selectedImage.id === image.id) {
                setSelectedImage(null)
              } else {
                setSelectedImage(image)
              }
            }}
          >
            <ImageCard
              image={image}
              update={update}
              remove={remove}
              selected={image === selectedImage}
            />
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <Button onClick={toggle} color="error">
          Close
        </Button>
        <Button disabled={!selectedImage} onClick={handleSubmit}>
          Select
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

SelectImage.propTypes = {
  images: PropTypes.array,
  update: PropTypes.func,
  remove: PropTypes.func,
  toggle: PropTypes.func,
  callback: PropTypes.func,
}

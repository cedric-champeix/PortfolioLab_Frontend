import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

export default function ImageAction({ image, update }) {
  const [imageData, setImageData] = useState({
    name: image.name ? image.name : '',
  })

  //Triggers form toggle
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  const handleSubmit = async () => {
    update(image.id, imageData.name)
    toggle()
  }

  return (
    <div>
      <Paper>
        <Dialog open={open}>
          <DialogTitle>Edit image</DialogTitle>
          <Box component="form">
            <DialogContent style={{ paddingTop: 0 }}>
              <TextField
                autoFocus
                value={imageData.name}
                onChange={(e) => {
                  setImageData({ name: e.target.value })
                }}
                margin="dense"
                id="name"
                name="name"
                label="Image name"
                type="text"
                fullWidth
                multiline
                variant="standard"
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={toggle} color="error">
                Close
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Paper>
      <Button size="small" onClick={toggle}>
        Edit
      </Button>
    </div>
  )
}

ImageAction.propTypes = {
  image: PropTypes.object,
  update: PropTypes.func,
}

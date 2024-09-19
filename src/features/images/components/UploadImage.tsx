import { ChangeEvent, useState } from 'react';
import { Box, DialogActions, DialogContent } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import placeHolder from '../../../assets/icons/placeholder.png'

interface UploadImageProps {
  upload: (file: File, body: {name: string}, cb: (_: any) => void) => void,
  toggle: () => void,
  callback: (_: any) => void,
}

interface Img {
  name: string,
  image: File | null
}

export const UploadImage = ({ upload, toggle, callback }: UploadImageProps) => {
  const [uploadData, setUploadData] = useState<Img>({ name: '', image: null })

  const [displayedImage, setDisplayedImage] = useState(
    uploadData.image ? uploadData.image : placeHolder
  )

  const fallbackImage = () => {
    setUploadData({ name: uploadData.name, image: placeHolder })
  }

  const setImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadData({
        ...uploadData,
        image: e.target.files[0],
      })
      setDisplayedImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const setName = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadData({
      ...uploadData,
      name: e.target.value,
    })
  }

  const handleSubmit = () => {
    const body = {
      name: uploadData.name,
    }

    if (uploadData.image) {
      upload(uploadData.image, body, callback)
      toggle()
    }
  }

  return (
    <Box>
      <Box component="form">
        <DialogContent>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: 'none' }}
            onChange={setImage}
          />
          <Button style={{ width: '80%', margin: 'auto' }}>
            <label htmlFor="select-image" style={{ cursor: 'pointer' }}>
              <Box
                component={'img'}
                width="90%"
                maxWidth="500px"
                maxHeight="400px"
                margin="auto"
                src={displayedImage}
                onError={fallbackImage}
                alt={'Profile picture preview'}
              />
            </label>
          </Button>

          <TextField
            value={uploadData.name}
            onChange={setName}
            required
            id="name"
            type="name"
            label="Image name"
            margin="dense"
            variant="standard"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={toggle} color="error">
            Close
          </Button>
          <Button disabled={!uploadData.image} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Box>
  )
}

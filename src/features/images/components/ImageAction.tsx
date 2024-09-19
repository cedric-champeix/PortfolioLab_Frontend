import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { ImageObj } from '../../../types/entities/Image.ts';

interface ImageActionProps {
  image: ImageObj;
  update: (id: string, name: string) => void;
}

export const ImageAction = ({ image, update }: ImageActionProps) => {
  const [imageData, setImageData] = useState({
    name: image.name ? image.name : '',
  });

  //Triggers form toggle
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    update(image.id, imageData.name);
    toggle();
  };

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
                  setImageData({ name: e.target.value });
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
  );
};

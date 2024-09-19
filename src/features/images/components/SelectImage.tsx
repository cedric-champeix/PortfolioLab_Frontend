import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { ImageObj } from '../../../types/entities/Image.ts';
import { ImageCard } from './ImageCard.tsx';

interface SelectImageProps {
  images: ImageObj[];
  update: (id: string, name: string) => void;
  remove: (id: string) => void;
  toggle: () => void;
  callback: (_: any) => void;
}

export const SelectImage = ({
  images,
  update,
  remove,
  toggle,
  callback,
}: SelectImageProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageObj | null>(null);

  const handleSubmit = () => {
    callback(selectedImage);
    toggle();
  };

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
                setSelectedImage(null);
              } else {
                setSelectedImage(image);
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
  );
};

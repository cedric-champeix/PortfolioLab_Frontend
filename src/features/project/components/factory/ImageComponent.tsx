import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import placeHolder from '../../../../assets/icons/placeholder.png';
import { constants } from '../../../../constants.ts';
import { Component } from '../../../../types/entities/Component.ts';
import { ImageObj } from '../../../../types/entities/Image.ts';
import { ImageHandler } from '../../../images/components/ImageHandler.tsx';

interface Props {
  component: Component;
  update: (id: string, body: { type: string; data: object }) => void;
}

export const ImageComponent: React.FunctionComponent<Props> = ({
  component,
  update,
}) => {
  const [image, setImage] = useState(
    component.data.image
      ? constants.BACKEND_URL + '' + component.data.image
      : placeHolder
  );

  const [open, setOpen] = useState(false);

  const fallbackImage = () => {
    setImage(placeHolder);
  };

  const toggle = () => {
    setOpen(!open);
  };

  const updateImage = (newImage: ImageObj) => {
    const body = {
      type: component.type,
      data: {
        image: newImage.path,
      },
    };

    update(component.id, body);
    setImage(constants.BACKEND_URL + '' + newImage.path);
  };

  return (
    <div>
      <ImageHandler open={open} toggle={toggle} callback={updateImage} />
      <Button onClick={toggle} style={{ width: '80%' }}>
        <Box
          component={'img'}
          margin="auto"
          width="90%"
          maxWidth="900px"
          maxHeight="500px"
          src={image}
          onError={fallbackImage}
          alt={'Project Image'}
        />
      </Button>
    </div>
  );
};

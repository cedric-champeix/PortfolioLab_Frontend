import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import placeHolder from '../../../../assets/icons/placeholder.png';
import { constants } from '../../../../constants.ts';
import { Component } from '../../../../types/entities/Component.ts';
import { ImageObj } from '../../../../types/entities/Image.ts';
import { ImageHandler } from '../../../images/components/ImageHandler.tsx';
import { TextEditor } from '../TextEditor.tsx';

interface Props {
  component: Component;
  update: (id: string, body: { type: string; data: object }) => void;
  leftText: boolean;
}

export const TextImageComponent: React.FunctionComponent<Props> = ({
  component,
  update,
  leftText,
}) => {
  const [image, setImage] = useState(
    component.data.image
      ? constants.BACKEND_URL + '' + component.data.image
      : placeHolder
  );

  const [open, setOpen] = useState(false);

  const saveText = (_: any, editor: TinyMCEEditor) => {
    const body = {
      type: component.type,
      data: {
        image: component.data.image,
        text: editor.getContent({ format: 'html' }),
      },
    };
    update(component.id, body);
  };

  const updateImage = (newImage: ImageObj) => {
    const body = {
      type: component.type,
      data: {
        image: newImage.path,
        text: component.data.text,
      },
    };

    update(component.id, body);
    setImage(constants.BACKEND_URL + '' + newImage.path);
  };

  const fallbackImage = () => {
    setImage(placeHolder);
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {leftText ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextEditor
              text={component.data.text}
              save={saveText}
              height="300px"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageHandler open={open} toggle={toggle} callback={updateImage} />
            <Button onClick={toggle}>
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
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageHandler open={open} toggle={toggle} callback={updateImage} />
            <Button onClick={toggle}>
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
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextEditor
              text={component.data.text}
              save={saveText}
              height="300px"
              width="100%"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

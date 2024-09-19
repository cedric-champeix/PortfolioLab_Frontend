import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import profilePlaceHolder from '../../../../assets/icons/blank-profile-picture.png';
import { constants } from '../../../../constants.ts';
import { ImageObj } from '../../../../types/entities/Image.ts';
import { Resume } from '../../../../types/entities/Resume.ts';
import { ImageHandler } from '../../../images/components/ImageHandler.tsx';
import { useResumeImage } from '../../hooks/useResumeImage.ts';

interface Props {
  resumeData: Resume;
}

export const ImageAction: React.FunctionComponent<Props> = ({ resumeData }) => {
  const [open, setOpen] = useState(false);
  const { image, setImage, connectImage } = useResumeImage();

  useEffect(() => {
    setImage(
      resumeData.Image
        ? constants.BACKEND_URL + resumeData.Image.path
        : profilePlaceHolder
    );
  }, [resumeData]);

  const toggle = () => {
    setOpen(!open);
  };

  const fallbackImage = () => {
    // setImage(profilePlaceHolder)
  };

  const updateImage = async (newImage: ImageObj) => {
    connectImage(newImage);
  };

  return (
    <>
      <ImageHandler open={open} toggle={toggle} callback={updateImage} />
      <Button onClick={toggle}>
        <Box
          component={'img'}
          border="1px solid #1976d2"
          borderRadius="50%"
          margin="auto"
          width={200}
          height={200}
          src={image}
          onError={fallbackImage}
          alt={'Profile picture'}
        ></Box>
      </Button>
    </>
  );
};

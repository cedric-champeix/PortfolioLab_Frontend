import { CardActions } from '@mui/joy';
import { Box, Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import placeHolder from '../../../assets/icons/placeholder.png';
import { constants } from '../../../constants.ts';
import { useConfirmation } from '../../../hooks/useConfirmation.ts';
import { ImageObj } from '../../../types/entities/Image.ts';
import { ImageAction } from './ImageAction.tsx';

interface ImageCardProps {
  image: ImageObj;
  update: (id: string, name: string) => void;
  remove: (id: string) => void;
  selected: boolean;
}

export const ImageCard = ({
  image,
  update,
  remove,
  selected,
}: ImageCardProps) => {
  const [imagePath, setImagePath] = useState(
    image.path ? constants.BACKEND_URL + '' + image.path : placeHolder
  );

  const fallbackImage = () => {
    setImagePath(placeHolder);
  };

  const confirm = useConfirmation();

  const confirmRemove = () => {
    confirm({
      catchOnCancel: true,
      name: `the image ${image.name}`,
    }).then(() => {
      remove(image.id);
    });
  };

  return (
    <Card
      sx={{ width: 260 }}
      style={selected ? { border: '5px solid #1976d2' } : {}}
    >
      <Box
        component={'img'}
        sx={{
          height: 180,
          width: '100%',
          overflow: 'hidden',
        }}
        src={imagePath}
        onError={fallbackImage}
        alt={'Project Image'}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {image.name.length < 25
            ? image.name
            : image.name.slice(0, 25) + '...'}
        </Typography>
      </CardContent>
      <CardActions>
        <ImageAction image={image} update={update} />
        <Button size="small" color="error" onClick={confirmRemove}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

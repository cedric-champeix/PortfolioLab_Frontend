import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <Typography
    width="fit-content"
    component="h2"
    variant="h6"
    color="primary"
    gutterBottom
  >
    {children}
  </Typography>;

};

export default Title;

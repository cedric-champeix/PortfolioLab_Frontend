import Box from '@mui/material/Box';
import { ComponentProps, ReactNode } from 'react';

interface TabPanelProps extends ComponentProps<'div'> {
  children: ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;

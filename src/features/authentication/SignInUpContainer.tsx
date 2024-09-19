import { Tab, Tabs } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '../../components/TabPanel.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';

const SignInUpContainer = () => {
  const [value, setValue] = useState(0);

  // @ts-ignore
  const handleChange = (event: SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const paperStyle = { width: 400, margin: '20px auto' };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: '200px' }} label="Sign In" />

        <Tab style={{ width: '200px' }} label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Paper>
  );
};

export default SignInUpContainer;

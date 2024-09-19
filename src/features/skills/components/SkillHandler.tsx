import { Dialog, Tab, Tabs } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import TabPanel from '../../../components/TabPanel.tsx';
import { useSkills } from '../hooks/useSkills.ts';
import { CreateSkill } from './CreateSkill.tsx';
import { SelectSkill } from './SelectSkill.tsx';

interface Props {
  open: boolean;
  toggle: () => void;
  callback: (_: any) => void;
}

export const SkillHandler: React.FunctionComponent<Props> = ({
  open,
  toggle,
  callback,
}) => {
  const [value, setValue] = useState(0);

  const { skills, create, update, remove } = useSkills();

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={20}>
      <Dialog open={open}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: '50%' }} label="Skills" />

          <Tab style={{ width: '50%' }} label="Create new skill" />
        </Tabs>
        <TabPanel value={value} index={0} style={{ overflow: 'hidden' }}>
          <SelectSkill
            skills={skills}
            update={update}
            remove={remove}
            toggle={toggle}
            callback={callback}
          />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ overflow: 'hidden' }}>
          <CreateSkill create={create} toggle={toggle} callback={callback} />
        </TabPanel>
      </Dialog>
    </Paper>
  );
};

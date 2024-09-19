import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Skill } from '../../../types/entities/Skill.ts';
import { SkillChipEdit } from './SkillChipEdit.tsx';

interface Props {
  skills: Skill[];
  update: (
    id: string,
    name: string,
    description: string,
    isSoft: boolean
  ) => void;
  remove: (id: string) => void;
  toggle: () => void;
  callback: (_: any) => void;
}

export const SelectSkill: React.FunctionComponent<Props> = ({
  skills,
  update,
  remove,
  toggle,
  callback,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSubmit = () => {
    callback(selectedSkill);
    toggle();
  };

  return (
    <React.Fragment>
      {skills.length === 0 && (
        <Typography margin="25px">You did not create any skill yet.</Typography>
      )}
      <Grid
        container
        style={{ height: '100%', maxHeight: '75vh', overflow: 'auto' }}
        sx={{ p: 3 }}
        spacing={2}
      >
        {skills.map((skill) => (
          <Grid
            item
            key={skill.id}
            onClick={() => {
              if (selectedSkill && selectedSkill.id === skill.id) {
                setSelectedSkill(null);
              } else {
                setSelectedSkill(skill);
              }
            }}
          >
            <SkillChipEdit
              skill={skill}
              update={update}
              remove={remove}
              selected={skill === selectedSkill}
            />
          </Grid>
        ))}
      </Grid>
      <DialogActions>
        <Button onClick={toggle} color="error">
          Close
        </Button>
        <Button disabled={!selectedSkill} onClick={handleSubmit}>
          Select
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

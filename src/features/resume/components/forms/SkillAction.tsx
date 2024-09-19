import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { ActionTypes } from '../../../../types/ActionTypes.ts';

interface Props {
  type: ActionTypes,
  skillId: string,
  skillName: string,
  description: string,
  mastery: string,
  isSoft: boolean,
  createSkill: (body: Record<string, any>) => void,
  updateSkill: (id: string, body: Record<string, any>) => void,
  resumeId: string,
}

export const SkillAction: React.FunctionComponent<Props> = ({
                                                              type,
                                                              skillId,
                                                              skillName,
                                                              description,
                                                              mastery,
                                                              isSoft,
                                                              createSkill,
                                                              updateSkill,
                                                              resumeId,
                                                            }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    mastery: '',
    isSoft: false,
  });

  const toggle = () => {
    setData({
      name: skillName,
      description: description,
      mastery: mastery,
      isSoft: isSoft,
    });
    setOpen(!open);
  };

  const handleSubmit = () => {
    const body = {
      name: data.name,
      description: data.description,
      isSoft: data.isSoft,
      resumeId: resumeId,
    };

    console.log(body);

    if (type === ActionTypes.EDIT) {
      updateSkill(skillId, body);
    } else if (type === ActionTypes.ADD) {
      createSkill(body);
    }

    toggle();
  };

  return <>
    <Paper>
      <Dialog open={open}>
        <DialogTitle>
          {type === ActionTypes.EDIT ? `Edit skill ${skillName}` : 'Create a skill'}
        </DialogTitle>
        <Box component="form">
          <DialogContent style={{ width: '400px' }}>
            <TextField
              autoFocus
              value={data.name}
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              margin="dense"
              required
              id="name"
              label="Skill name"
              type="name"
              fullWidth
              variant="standard"
            />

            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    setData({
                      ...data,
                      isSoft: !data.isSoft,
                    })
                  }
                  checked={data.isSoft}
                  defaultChecked
                />
              }
              label="Soft Skill"
            />

            <br />
            <br />
          </DialogContent>

          <DialogActions>
            <Button onClick={toggle} color="error">
              Close
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
    {type === ActionTypes.EDIT ? (
      <EditIcon
        style={{ marginLeft: '10px' }}
        onClick={() => {
          toggle();
        }}
      />
    ) : (
      <Chip
        label={'Add'}
        style={{ marginTop: '10px' }}
        icon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
        variant={'outlined'}
        onClick={toggle}
      />
    )}
  </>;
};

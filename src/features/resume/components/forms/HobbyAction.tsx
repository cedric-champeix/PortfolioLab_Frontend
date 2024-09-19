import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ActionTypes } from '../../../../types/ActionTypes.ts';

interface Props {
  type: ActionTypes,
  hobbyName: string,
  hobbyDescription: string,
  hobbyId?: string,
  resumeId: string,
  createHobby?: (body: Record<string, any>) => void,
  updateHobby?: (id: string, body: Record<string, any>) => void,
}

export const HobbyAction: React.FunctionComponent<Props> = ({
                                                              type,
                                                              hobbyName,
                                                              hobbyDescription,
                                                              hobbyId,
                                                              resumeId,
                                                              createHobby,
                                                              updateHobby,
                                                            }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: hobbyName,
    description: hobbyDescription,
  });

  const toggle = () => {
    setData({ name: hobbyName, description: hobbyDescription });
    setOpen(!open);
  };

  const handleSubmit = () => {
    const body = {
      name: data.name,
      description: data.description,
      resumeId: resumeId,
    };

    if (type === ActionTypes.EDIT && updateHobby && hobbyId) {
      updateHobby(hobbyId, body);
    } else if (type === ActionTypes.ADD && createHobby) {
      createHobby(body);
    }

    toggle();
  };

  return <>
    <Paper>
      <Dialog open={open}>
        <DialogTitle>
          {type === ActionTypes.EDIT ? `Edit hobby ${hobbyName}` : 'Create a hobby'}
        </DialogTitle>
        <Box component="form">
          <DialogContent>
            <TextField
              autoFocus
              required
              value={data.name}
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              margin="dense"
              id="name"
              label="Hobby"
              type="name"
              fullWidth
              multiline
              variant="standard"
            />

            <TextField
              autoFocus
              value={data.description || ''}
              onChange={(e) => {
                setData({
                  ...data,
                  description: e.target.value,
                });
              }}
              margin="dense"
              id="description"
              label="Description"
              type="name"
              fullWidth
              multiline
              variant="standard"
            />
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
    <Button variant="outlined" color="primary" onClick={toggle}>
      {type === ActionTypes.EDIT ? 'Edit' : 'Create'}
    </Button>
  </>;
};

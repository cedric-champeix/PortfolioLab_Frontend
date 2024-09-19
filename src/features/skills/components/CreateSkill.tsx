import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNotification } from '../../../hooks/useNotification.ts';

interface Props {
  create: (name: string, description: string, isSoft: boolean, cb: (_: any) => void) => void,
  toggle: () => void,
  callback: (_: any) => void
}

export const CreateSkill: React.FunctionComponent<Props> = ({ create, toggle, callback }) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    isSoft: false,
  });

  const { notify } = useNotification();

  const handleSubmit = () => {
    create(data.name, data.description, data.isSoft, callback);
    toggle();
    notify('Skill created successfully ! ', 'success');
  };

  return (
    <Box component="form">
      <DialogContent>
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

        <TextField
          autoFocus
          value={data.description}
          onChange={(e) => {
            setData({
              ...data,
              description: e.target.value,
            });
          }}
          margin="dense"
          id="description"
          label="Skill description"
          type="name"
          fullWidth
          multiline
          variant="standard"
        />

        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setData({ ...data, isSoft: !data.isSoft })}
              checked={data.isSoft}
            />
          }
          label="Soft Skill"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={toggle} color="error">
          Close
        </Button>
        <Button disabled={!data.name} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Box>
  );
};
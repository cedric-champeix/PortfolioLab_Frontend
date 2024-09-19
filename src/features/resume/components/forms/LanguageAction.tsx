import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { ActionTypes } from '../../../../types/ActionTypes.ts';
import { LanguageLevelTypes } from '../../../../types/languageLevel.ts';

interface Props {
  type: ActionTypes;
  languageId?: string;
  languageName: string;
  languageLevel: string;
  resumeId: string;
  createLanguage?: (body: Record<string, any>) => void;
  updateLanguage?: (id: string, body: Record<string, any>) => void;
}

export const LanguageAction: React.FunctionComponent<Props> = ({
  type,
  languageName,
  languageId,
  languageLevel,
  resumeId,
  createLanguage,
  updateLanguage,
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    name: languageName,
    level: languageLevel,
  });

  const toggle = () => {
    setData({ name: languageName, level: languageLevel });
    setOpen(!open);
  };

  const handleSubmit = () => {
    //Set default level to B1
    if (!data.level) {
      data.level = LanguageLevelTypes.B1;
    }

    const body = {
      name: data.name,
      level: data.level,
      resumeId: resumeId,
    };

    if (type === ActionTypes.EDIT && updateLanguage && languageId) {
      updateLanguage(languageId, body);
    } else if (type === ActionTypes.ADD && createLanguage) {
      createLanguage(body);
    }

    toggle();
  };

  return (
    <>
      <Paper>
        <Dialog open={open}>
          <DialogTitle>
            {type === ActionTypes.EDIT
              ? `Edit language ${languageName}`
              : 'Create a language'}
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
                label="Language"
                type="name"
                fullWidth
                multiline
                variant="standard"
              />
              <Select
                value={data.level ? data.level : LanguageLevelTypes.B1}
                onChange={(e) => setData({ ...data, level: e.target.value })}
                name={'level'}
                id={'level'}
              >
                {Object.values(LanguageLevelTypes).map((value, i) => (
                  <MenuItem key={value + i} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
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
    </>
  );
};

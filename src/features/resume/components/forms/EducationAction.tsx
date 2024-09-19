import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { format, parse } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ActionTypes } from '../../../../types/ActionTypes.ts';

const onGoing = 'ongoing';

interface Props {
  type: ActionTypes;
  eId?: string;
  eEducationName: string;
  eUniversityName: string;
  eDescription: string;
  eStartDate: string;
  eEndDate: string;
  resumeId: string;
  createEducation?: (body: Record<string, any>) => void;
  updateEducation?: (id: string, body: Record<string, any>) => void;
}

export const EducationAction: React.FunctionComponent<Props> = ({
  type,
  eId,
  eEducationName,
  eUniversityName,
  eDescription,
  eStartDate,
  eEndDate,
  resumeId,
  createEducation,
  updateEducation,
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    educationName: eEducationName,
    universityName: eUniversityName,
    description: eDescription,
    startDate: eStartDate,
    endDate: eEndDate,
  });

  const toggle = () => {
    setData({
      educationName: eEducationName,
      universityName: eUniversityName,
      description: eDescription,
      startDate: eStartDate,
      endDate: eEndDate,
    });
    setOpen(!open);
  };

  const handleSubmit = () => {
    const body = {
      formationName: data.educationName,
      universityName: data.universityName,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      resumeId: resumeId,
    };

    if (type === ActionTypes.EDIT && updateEducation && eId) {
      updateEducation(eId, body);
    } else if (type === ActionTypes.ADD && createEducation) {
      createEducation(body);
    }

    toggle();
  };

  const parseDate = (dateString: string) => {
    if (dateString === onGoing || !dateString) {
      return null;
    }

    // Set a default day (e.g., 1) to create a valid date
    return parse(dateString, 'MM/yyyy', new Date(0, 0, 1));
  };

  const dateToStr = (date: Date | null) => {
    if (!date) {
      return '';
    }

    return format(date, 'MM/yyyy');
  };

  const maxDate = (date: string) => {
    if (!date || date === onGoing) {
      return new Date();
    }

    return parseDate(date) ?? undefined;
  };

  const minDate = (date: string) => {
    if (!date) {
      return undefined;
    }

    return parseDate(date) ?? undefined;
  };

  return (
    <>
      <Paper>
        <Dialog open={open}>
          <DialogTitle>
            {type === ActionTypes.EDIT
              ? `Edit education ${eEducationName}`
              : 'New education'}
          </DialogTitle>
          <Box component="form">
            <DialogContent>
              <TextField
                autoFocus
                value={data.educationName}
                onChange={(e) => {
                  setData({
                    ...data,
                    educationName: e.target.value,
                  });
                }}
                margin="dense"
                required
                id="name"
                label="Education name"
                type="name"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                value={data.universityName}
                onChange={(e) => {
                  setData({
                    ...data,
                    universityName: e.target.value,
                  });
                }}
                margin="dense"
                required
                id="name"
                label="University"
                type="name"
                fullWidth
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
              <br />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'start',
                }}
              >
                <div>
                  <Typography color="text.secondary">Start date:</Typography>
                  <DatePicker
                    selected={parseDate(data.startDate)}
                    onChange={(date: Date | null) =>
                      setData({
                        ...data,
                        startDate: dateToStr(date),
                      })
                    }
                    dateFormat="MM/yyyy"
                    showIcon
                    showMonthYearPicker
                    maxDate={maxDate(data.endDate)}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography color="text.secondary">End date:</Typography>
                  <DatePicker
                    selected={parseDate(data.endDate)}
                    onChange={(date) =>
                      setData({
                        ...data,
                        endDate: dateToStr(date),
                      })
                    }
                    dateFormat="MM/yyyy"
                    showIcon
                    showMonthYearPicker
                    isClearable
                    minDate={minDate(data.startDate)}
                  />
                </div>
              </div>
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

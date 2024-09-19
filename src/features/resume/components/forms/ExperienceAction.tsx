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
  expId?: string;
  expTitle: string;
  expCompany: string;
  expDescription: string;
  expStartDate: string;
  expEndDate: string;
  resumeId: string;
  create?: (body: Record<string, any>) => void;
  update?: (id: string, body: Record<string, any>) => void;
}

export const ExperienceAction: React.FunctionComponent<Props> = ({
  type,
  expId,
  expTitle,
  expCompany,
  expDescription,
  expStartDate,
  expEndDate,
  resumeId,
  create,
  update,
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    title: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const toggle = () => {
    setData({
      title: expTitle,
      company: expCompany,
      description: expDescription,
      startDate: expStartDate,
      endDate: expEndDate,
    });
    setOpen(!open);
  };

  const handleSubmit = () => {
    const body = {
      title: data.title,
      company: data.company,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate || onGoing,
      resumeId: resumeId,
    };

    if (type === ActionTypes.EDIT && update && expId) {
      update(expId, body);
    } else if (type === ActionTypes.ADD && create) {
      create(body);
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
              ? `Edit experience ${expTitle}`
              : 'Create an experience'}
          </DialogTitle>
          <Box component="form">
            <DialogContent>
              <TextField
                autoFocus
                value={data.company}
                onChange={(e) => {
                  setData({
                    ...data,
                    company: e.target.value,
                  });
                }}
                margin="dense"
                required
                id="name"
                label="Company name"
                type="name"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                value={data.title}
                onChange={(e) => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
                margin="dense"
                required
                id="name"
                label="Experience name"
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
                label="Description"
                type="name"
                fullWidth
                multiline
                variant="standard"
              />
              <br />
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
                    onChange={(date) =>
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
                    maxDate={maxDate('')}
                    minDate={minDate(data.startDate)}
                  />
                  <Typography color="text.secondary" fontSize="small">
                    Leave empty if ongoing
                  </Typography>
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

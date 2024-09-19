import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import './css/components.css';

interface Props {
  create: (body: {
    type: string;
    index: number;
    distance: number;
    data: object;
  }) => void;
  index: number;
  distance: number;
}

export const AddComponent: React.FunctionComponent<Props> = ({
  create,
  index,
  distance,
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      type: String(formData.get('component')),
      index: index,
      distance: distance,
      data: {},
    };

    create(body);
    toggle();
  };

  return (
    <>
      <Paper>
        <Dialog open={open}>
          <DialogTitle>{'Create new component'}</DialogTitle>
          <Box
            component="form"
            onSubmit={submitForm}
            style={{ width: '500px' }}
          >
            <DialogContent>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Component
                </FormLabel>
                <RadioGroup
                  defaultValue="TEXT"
                  name="component"
                  sx={{ gap: 1 }}
                >
                  {/*<FormControlLabel value="TEXT" control={<Radio />} label={<img src={ProfilePicture} alt="Text component" width="100px"/>} />*/}
                  <FormControlLabel
                    value="TEXT"
                    control={<Radio />}
                    label="Text component"
                  />
                  <FormControlLabel
                    value="IMAGE"
                    control={<Radio />}
                    label="Image component"
                  />
                  <FormControlLabel
                    value="TEXT_IMAGE"
                    control={<Radio />}
                    label="Text-Image component"
                  />
                  <FormControlLabel
                    value="IMAGE_TEXT"
                    control={<Radio />}
                    label="Image-Text component"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={toggle} color="error">
                Close
              </Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Paper>
      <Button style={{ width: '100%', borderRadius: '15px' }} onClick={toggle}>
        <IoAddCircle size="50px" className="plus-button" />
      </Button>
    </>
  );
};

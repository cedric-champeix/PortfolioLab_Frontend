import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { ActionTypes } from '../../../../types/ActionTypes.ts';
import { ContactTypes } from '../../../../types/contact.ts';

const phoneRegExp =
  /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g;

const baseSchema = Yup.object().shape({
  title: Yup.string().required('required'),
});

const emailSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Required'),
});

const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const schemas = {
  [ContactTypes.EMAIL]: emailSchema,
  [ContactTypes.PHONE]: phoneSchema,
  [ContactTypes.ADDRESS]: Yup.object().shape({}),
  [ContactTypes.WEBSITE]: Yup.object().shape({}),
  [ContactTypes.LINKEDIN]: Yup.object().shape({}),
  [ContactTypes.GITHUB]: Yup.object().shape({}),
};

// const ContactTypeSelect = (value, changeCallback) => {
//   return (
//     <Select
//       value={value}
//       onChange={(e) => changeCallback(e)}
//       name={'title'}
//       id={'title'}
//     >
//       {Object.values(ContactTypes).map((value, i) => (
//         <MenuItem key={value + i} value={value}>
//           {value}
//         </MenuItem>
//       ))}
//     </Select>
//   )
// }

interface Props {
  type: ActionTypes;
  contactId?: string;
  contactTitle?: ContactTypes;
  contactText?: string;
  resumeId: string;
  createContact?: (body: Record<string, any>) => void;
  updateContact?: (id: string, body: Record<string, any>) => void;
}

export const ContactAction: React.FunctionComponent<Props> = ({
  type,
  contactId,
  contactTitle,
  contactText,
  resumeId,
  createContact,
  updateContact,
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    title: contactTitle ?? ContactTypes.EMAIL,
    text: contactText ?? '',
  });

  // const [currentContactType, setCurrentContactType] = useState<ContactTypes>(ContactTypes.EMAIL);

  const validationSchema = useMemo(() => {
    console.log('Contact schema changed to ' + data.title);
    return baseSchema.shape({
      [data.title]: schemas[data.title],
    });
  }, [data.title]);

  const initialValues = {
    title: data.title,
    text: data.text,
  };

  const toggle = () => {
    setData({
      title: contactTitle ?? ContactTypes.EMAIL,
      text: contactText ?? '',
    });
    setOpen(!open);
  };

  const handleSubmit = () => {
    console.log(data);
    const body = {
      title: data.title || ContactTypes.EMAIL,
      text: data.text,
      resumeId: resumeId,
    };

    console.log(type);

    if (type === ActionTypes.EDIT && contactId && updateContact) {
      updateContact(contactId, body);
    } else if (type === ActionTypes.ADD && createContact) {
      console.log('Add contact');
      createContact(body);
    }

    toggle();
  };

  return (
    <>
      <Paper>
        <Dialog open={open}>
          <DialogTitle>
            {type === ActionTypes.EDIT
              ? `Edit contact ${contactTitle}`
              : 'Create a contact'}
          </DialogTitle>
          <Box component="form">
            <Formik
              onSubmit={() => {}}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <>
                <DialogContent>
                  <Select
                    value={data.title}
                    onChange={(e) => {
                      setData({
                        ...data,
                        title: e.target.value as ContactTypes,
                      });
                    }}
                    name={'title'}
                    id={'title'}
                  >
                    {Object.values(ContactTypes).map((value, i) => (
                      <MenuItem key={value + i} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField
                    autoFocus
                    required
                    value={data.text}
                    onChange={(e) => {
                      setData({
                        ...data,
                        text: e.target.value,
                      });
                    }}
                    margin="dense"
                    id="text"
                    label="Contact text"
                    type="name"
                    fullWidth
                    multiline
                    variant="standard"
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
              </>
            </Formik>
          </Box>
        </Dialog>
      </Paper>

      {type === ActionTypes.EDIT ? (
        <IconButton
          style={{ position: 'relative', bottom: '8px' }}
          aria-label={'edit'}
          onClick={toggle}
        >
          <EditIcon></EditIcon>
        </IconButton>
      ) : (
        <Fab size={'small'} onClick={toggle} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';

interface RemoveSafeguardProps {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  name?: string;
}

export const ConfirmationDialog = ({
  open,
  onSubmit,
  onClose,
  name,
}: RemoveSafeguardProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to remove {name} ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onSubmit}>
          Delete
        </Button>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

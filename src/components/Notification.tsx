import { Alert, AlertColor, Snackbar } from '@mui/material';

interface NotificationProps {
  open: boolean;
  severity: AlertColor;
  message: string;
}

const Notification = ({ open, severity, message }: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => {}}
    >
      <Alert severity={severity} elevation={6}>
        {message}{' '}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { bool, string } from 'prop-types'

export default function Notification({ open, severity, message }) {
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
  )
}

Notification.propTypes = {
  open: bool,
  severity: string,
  message: string,
}

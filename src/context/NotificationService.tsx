import { createContext, ReactNode, useCallback, useState } from 'react';
import Notification from '../components/Notification.tsx'
import { AlertColor } from '@mui/material';

interface NotificationServiceContextProps {
  notify: (message: string , severity: AlertColor) => void
}

export const NotificationServiceContext = createContext<NotificationServiceContextProps>(null!)

interface NotificationServiceProviderProps {
  children: ReactNode
}

export const NotificationServiceProvider = ({ children }: NotificationServiceProviderProps) => {
  const [alertOpen, setAlertOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('info')

  /**
   * Triggers the notification message
   * @param message   Message to trigger
   * @param severity  Alert severity : ["success", "info", "error", "warning"]
   */
  const notify = (message: string, severity: AlertColor) => {
    setMessage(message)
    setSeverity(severity)
    triggerAlert()
  }

  const triggerAlert = useCallback(() => {
    setAlertOpen(true)
    setTimeout(() => {
      setAlertOpen(false)
    }, 2000)
  }, [])

  return (
    <>
      <NotificationServiceContext.Provider value={{ notify }}>
        {children}
      </NotificationServiceContext.Provider>
      <Notification
        open={alertOpen}
        message={message}
        severity={severity}
      ></Notification>
    </>
  )
}

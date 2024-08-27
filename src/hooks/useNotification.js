import { useContext } from 'react'
import { NotificationServiceContext } from '../context/NotificationService.jsx'

export const useNotification = () => useContext(NotificationServiceContext)

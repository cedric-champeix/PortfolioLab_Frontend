import { useContext } from 'react';
import { NotificationServiceContext } from '../context/NotificationService.tsx';

export const useNotification = () => useContext(NotificationServiceContext);

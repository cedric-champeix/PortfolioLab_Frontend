import { useContext } from 'react';
import { QuickActionContext } from '../context/QuickActionService.tsx';

export const useQuickActions = () => useContext(QuickActionContext);

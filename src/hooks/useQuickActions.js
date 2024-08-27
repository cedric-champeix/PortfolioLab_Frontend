import { useContext } from 'react'
import { QuickActionContext } from '../context/QuickActionService.jsx'

export const useQuickActions = () => useContext(QuickActionContext)

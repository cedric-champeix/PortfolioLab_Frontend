import { useContext } from 'react'
import { ConfirmationServiceContext } from '../context/ConfirmationService.tsx'

export const useConfirmation = () => useContext(ConfirmationServiceContext)

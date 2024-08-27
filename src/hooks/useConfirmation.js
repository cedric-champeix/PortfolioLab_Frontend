import { useContext } from 'react'
import { ConfirmationServiceContext } from '../context/ConfirmationService.jsx'

export const useConfirmation = () => useContext(ConfirmationServiceContext)

import { useState } from 'react'

/**
 * Hook to togle the error dialog
 */
export const useToggleDialog = (initialState) => {
  const [open, setOpen] = useState(initialState)

  const toggleDialog = () => {
    setOpen(!open)
  }

  return [open, toggleDialog]
}

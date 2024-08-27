import React, { useState } from 'react'
import Button from '@mui/material/Button'
import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'

export default function ProjectAction({ create }) {
  const [projectData, setProjectData] = useState({
    name: '',
  })

  //Triggers form toggle
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setProjectData({ name: '' })
    setOpen(!open)
  }

  const handleSubmit = async () => {
    const body = {
      name: projectData.name,
    }

    create(body)
    toggle()
  }

  return (
    <>
      <Paper>
        <Dialog open={open}>
          <DialogTitle>New Project</DialogTitle>
          <Box component="form">
            <DialogContent style={{ paddingTop: 0 }}>
              <Box style={{ marginBottom: '20px' }}>
                <TextField
                  autoFocus
                  required
                  value={projectData.name}
                  onChange={(e) => {
                    setProjectData({ name: e.target.value })
                  }}
                  margin="dense"
                  id="name"
                  name="name"
                  label="Project name"
                  type="text"
                  variant="standard"
                  fullWidth
                  multiline
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={toggle} color="error">
                Close
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Paper>

      <Card>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggle}
          sx={{ width: 250, height: 250 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <IconButton color="primary" aria-label="add">
              <AddIcon fontSize="small" sx={{ width: 75, height: 75 }} />
            </IconButton>
            <Typography variant="body1">New project</Typography>
          </Box>
        </Button>
      </Card>
    </>
  )
}

ProjectAction.propTypes = {
  create: PropTypes.func,
}

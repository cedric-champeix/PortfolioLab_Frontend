import React from 'react'
import Box from '@mui/material/Box'
import ProjectAction from '../features/portfolio/ProjectAction.jsx'
import Grid from '@mui/material/Grid'
import { useProjects } from '../features/portfolio/hooks/useProjects.js'
import ProjectCard from '../features/portfolio/ProjectCard.jsx'
import { useEffect } from 'react'

export default function Portfolio() {
  const { projects, create, remove } = useProjects()

  useEffect(() => {
    console.log(projects)
  }, [])

  return (
    <Box
      gridAutoFlow="row"
      className={'Element-'}
      component="div"
      sx={{
        backgroundColor: '#FFF',
        height: '95vh',
      }}
    >
      <Grid container sx={{ p: 3 }} spacing={2}>
        <Grid item>
          <ProjectAction create={create}></ProjectAction>
        </Grid>
        {projects.map((project) => (
          <Grid item key={project.id}>
            <ProjectCard project={project} remove={remove} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
Portfolio.componentName = 'Portfolio'

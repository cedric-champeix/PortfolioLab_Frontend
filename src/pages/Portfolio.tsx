import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useProjects } from '../features/portfolio/hooks/useProjects.ts';
import { ProjectAction } from '../features/portfolio/ProjectAction.tsx';
import { ProjectCard } from '../features/portfolio/ProjectCard.tsx';

interface Props {}

export const Portfolio: React.FunctionComponent<Props> & {
  componentName: string;
} = () => {
  const { projects, create, remove } = useProjects();

  useEffect(() => {
    console.log(projects);
  }, []);

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
  );
};
Portfolio.componentName = 'Portfolio';

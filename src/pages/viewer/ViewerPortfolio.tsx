import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useViewerPortfolio } from '../../features/viewer/portfolio/hooks/useViewerPortfolio.ts';
import { ViewerProjectCard } from '../../features/viewer/portfolio/ViewerProjectCard.tsx';
import NotFoundPage from '../error/404.tsx';

interface Props {}

export const ViewerPortfolio: React.FunctionComponent<Props> & {
  componentName: string;
} = () => {
  const { username } = useParams();

  if (!username) {
    return <NotFoundPage />;
  }

  const { projects } = useViewerPortfolio(username);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        sx={{ p: 3, width: '100%', maxWidth: 1400, margin: 'auto' }}
        spacing={2}
      >
        {projects.map((project) => (
          <Grid item key={project.id}>
            <ViewerProjectCard username={username} project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ViewerPortfolio.componentName = 'Portfolio';

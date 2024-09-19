import Box from '@mui/material/Box';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BaseResume } from '../../features/viewer/resume/BaseResume.tsx';
import { useViewerResume } from '../../features/viewer/resume/hooks/useViewerResume.ts';
import NotFoundPage from '../error/404.tsx';

interface Props {}

export const ViewerResume: React.FunctionComponent<Props> & {
  componentName: string;
} = () => {
  const username = useParams().username ?? '';

  const { userResume, resumeError } = useViewerResume(username);

  if (resumeError) return <NotFoundPage />;

  return (
    <Box sx={{ width: '100%' }}>
      <BaseResume userResume={userResume} />
    </Box>
  );
};
ViewerResume.componentName = 'Resume';

import Box from '@mui/material/Box';
import React from 'react';
import { useResumePreview } from '../features/resume/hooks/useResumePreview.ts';
import { BaseResume } from '../features/viewer/resume/BaseResume.tsx';

interface Props {}

export const PreviewResume: React.FunctionComponent<Props> = () => {
  const { resumePreview } = useResumePreview();

  return (
    <Box sx={{ width: '100%' }}>
      <BaseResume userResume={resumePreview} />
    </Box>
  );
};

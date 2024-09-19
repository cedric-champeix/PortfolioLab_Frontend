import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Language } from '../../../../types/entities/Language.ts';

interface Props {
  languages: Language[];
}

export const ResumeLanguages: React.FunctionComponent<Props> = ({
  languages,
}) => {
  return (
    <Box width="100%" display={languages.length !== 0 ? 'block' : 'none'}>
      <Typography variant="h4" color="primary">
        Languages
      </Typography>
      <Divider />
      <Box
        sx={{
          padding: '3mm',
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {languages.map((language) => (
          <Chip
            key={language.id}
            label={
              <Typography variant="body1" sx={{ fontWeight: '600' }}>
                {language.name}: {language.level}
              </Typography>
            }
          />
        ))}
      </Box>
    </Box>
  );
};

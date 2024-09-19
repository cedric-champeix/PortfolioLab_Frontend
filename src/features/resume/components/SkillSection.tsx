import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useConfirmation } from '../../../hooks/useConfirmation.ts';
import { useNotification } from '../../../hooks/useNotification.ts';
import { SkillHandler } from '../../skills/components/SkillHandler.tsx';
import { useSkills } from '../../skills/hooks/useSkills.ts';

interface Props {
  resumeId: string;
}

export const SkillSection: React.FunctionComponent<Props> = ({ resumeId }) => {
  const [open, setOpen] = useState(false);
  const confirm = useConfirmation();
  const { notify } = useNotification();
  const { fetchSkills, skills, connectToResume, disconnectFromResume } =
    useSkills(resumeId);

  const toggle = () => {
    setOpen(!open);

    if (open) {
      fetchSkills();
    }
  };

  const handleDelete = (skillId: string) => {
    confirm({
      catchOnCancel: true,
      name: 'Resume',
    }).then(() => {
      disconnectFromResume(skillId);
      notify('Skill removed successfully', 'success');
    });
  };

  return (
    <Box marginY="10px">
      <SkillHandler open={open} toggle={toggle} callback={connectToResume} />
      <Stack direction={'row'} spacing={2} style={{ flexWrap: 'wrap' }}>
        {skills.map((skill) => (
          <Tooltip title={skill.description} key={skill.id} arrow>
            <Chip
              label={skill.name}
              style={{ marginTop: '10px' }}
              onClick={toggle}
              onDelete={() => {
                handleDelete(skill.id);
              }}
            />
          </Tooltip>
        ))}
        <Chip
          label={'Add'}
          style={{ marginTop: '10px' }}
          icon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
          variant={'outlined'}
          onClick={toggle}
        />
      </Stack>
    </Box>
  );
};

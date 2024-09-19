import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, Stack, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Skill } from '../../../types/entities/Skill.ts';
import { SkillHandler } from '../../skills/components/SkillHandler.tsx';
import { useSkills } from '../../skills/hooks/useSkills.ts';

interface Props {
  projectId: string;
}

export const SkillContainer: React.FunctionComponent<Props> = ({
  projectId,
}) => {
  const [open, setOpen] = useState(false);

  console.log('PROJECT', projectId);

  const { fetchSkills, skills, connectToProject, disconnectFromProject } =
    useSkills(undefined, projectId || 'AWAITING');

  const toggle = () => {
    setOpen(!open);

    if (open) {
      fetchSkills();
    }
  };

  return (
    <div>
      <SkillHandler open={open} toggle={toggle} callback={connectToProject} />
      <Stack direction="row" spacing={2} style={{ flexWrap: 'wrap' }}>
        {skills.map((skill: Skill) => (
          <Tooltip title={skill.description} key={skill.id} arrow>
            <Chip
              label={skill.name}
              style={{ marginTop: '10px' }}
              onClick={toggle}
              onDelete={() => disconnectFromProject(skill.id)}
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
    </div>
  );
};

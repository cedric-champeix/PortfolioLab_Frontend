import { Chip, Tooltip } from '@mui/material'
import { Skill } from '../../../types/entities/Skill.ts';

interface SkillChipViewerProps {
  skill: Skill
}

export const SkillChipViewer = ({ skill }: SkillChipViewerProps) => {
  return (
    <Tooltip title={skill.description} key={skill.id} arrow>
      <Chip label={skill.name} style={{ marginTop: '10px' }} />
    </Tooltip>
  )
}
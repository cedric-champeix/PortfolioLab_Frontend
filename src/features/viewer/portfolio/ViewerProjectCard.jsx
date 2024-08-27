import { Box, Card, CardContent, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { constants } from '../../../constants.js'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SkillChipViewer from '../../skills/components/SkillChipViewer.jsx'
import placeHolder from '../../../assets/icons/placeholder.png'

export default function ViewerProjectCard({ username, project }) {
  const [image, setImage] = useState(
    project.MainImage?.path
      ? constants.BACKEND_URL + '' + project.MainImage.path
      : placeHolder
  )

  if (!project.skills) project.skills = []

  const fallbackImage = () => {
    setImage(placeHolder)
  }

  return (
    <Card sx={{ width: 350 }}>
      <Link to={`/viewer/${username}/portfolio/${project.id}`}>
        <Box
          component={'img'}
          sx={{
            height: 180,
            width: '100%',
            overflow: 'hidden',
          }}
          src={image}
          onError={fallbackImage}
          alt={'Project Image'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          spacing={2}
          style={{ flexWrap: 'wrap', padding: '0 10px 10px 10px' }}
        >
          {project.skills.slice(0, 5).map((skill) => (
            <SkillChipViewer skill={skill} key={skill.id} />
          ))}
        </Stack>
      </Link>
    </Card>
  )
}

ViewerProjectCard.propTypes = {
  username: PropTypes.string,
  project: PropTypes.object,
}

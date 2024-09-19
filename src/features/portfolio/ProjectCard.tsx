import { Box, Card, CardContent, MenuItem, Select, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/joy'
import placeHolder from '../../assets/icons/placeholder.png'
import { useState } from 'react'
import { constants } from '../../constants.ts'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { SkillChipViewer } from '../skills/components/SkillChipViewer.tsx'
import { endpoints } from '../../data/endpoints.ts'
import { useConfirmation } from '../../hooks/useConfirmation.ts'
import { Visibilities } from '../../types/entities/Visibilities.ts';
import { Project } from '../../types/entities/Project.ts';

interface ProjectCardProps {
  project: Project,
  remove: (id: string) => void
}

export const ProjectCard = ({ project, remove }: ProjectCardProps) => {
  const [image, setImage] = useState(
    project.MainImage?.path
      ? constants.BACKEND_URL + '' + project.MainImage.path
      : placeHolder
  )
  const [visible, setVisible] = useState(project.visible || false)

  if (!project.skills) project.skills = []

  const fallbackImage = () => {
    setImage(placeHolder)
  }

  const updateVisibility = (_visible: boolean) => {
    const url = endpoints.projectsEndpoint + '/' + project.id
    axios({
      url: `${url}/visibility`,
      method: 'PUT',
      withCredentials: true,
      data: {
        visible: _visible,
      },
    })
      .then(() => {
        setVisible(_visible)
      })
      .catch((error) => {
        console.error('Error when updating project visibility: ', error)
      })
  }

  const confirm = useConfirmation()

  const confirmRemove = () => {
    confirm({
      catchOnCancel: true,
      name: `the project ${project.name}`,
    }).then(() => {
      remove(project.id)
    })
  }

  return (
    <Card sx={{ width: 350 }}>
      <Link to={`/portfolio/${project.id}`}>
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
          style={{ flexWrap: 'wrap', padding: '0 10px' }}
        >
          {project.skills.slice(0, 5).map((skill) => (
            <SkillChipViewer skill={skill} key={skill.id} />
          ))}
        </Stack>
      </Link>
      <CardActions
        style={{
          width: '100%',
          padding: '5px 10px 5px 0',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Select
          value={visible ? Visibilities.PUBLIC : Visibilities.PRIVATE}
          sx={{ height: '3vh' }}
        >
          <MenuItem
            value={Visibilities.PRIVATE}
            onClick={() => updateVisibility(false)}
          >
            {Visibilities.PRIVATE}
          </MenuItem>
          <MenuItem
            value={Visibilities.PUBLIC}
            onClick={() => updateVisibility(true)}
          >
            {Visibilities.PUBLIC}
          </MenuItem>
        </Select>
        <IconButton
          aria-label="delete"
          onClick={confirmRemove}
          style={{
            bottom: 0,
            right: 0,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

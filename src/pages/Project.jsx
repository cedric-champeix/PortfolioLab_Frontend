import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useProject } from '../features/project/hooks/useProject.js'
import SkillContainer from '../features/project/components/SkillContainer.jsx'
import ComponentFactory from '../features/project/ComponentFactory.jsx'
import AddComponent from '../features/project/components/AddComponent.jsx'
import { useParams } from 'react-router-dom'
import { useComponent } from '../features/project/hooks/useComponent.js'
import MoveComponent from '../features/project/components/MoveComponent.jsx'
import ImageHandler from '../features/images/components/ImageHandler.jsx'
import Button from '@mui/material/Button'
import { constants } from '../constants.js'
import placeHolder from '../assets/icons/placeholder.png'
import TextField from '@mui/material/TextField'

export default function Project() {
  const { projectId } = useParams()

  const { projectData, updateProject, connectMainImage } = useProject(projectId)

  const { components, setComponents, create, update, move, remove } =
    useComponent(projectId, projectData.components)

  /**************** Project's informations ****************/

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [projectName, setProjectName] = useState(
    projectData.name || 'Project name'
  )

  const updateTitle = async () => {
    setIsEditingTitle(false)
    if (projectName) {
      await updateProject({
        name: projectName,
      })
    }
  }

  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [projectDescription, setProjectDescription] = useState(
    projectData.description || 'Add the description of your project here.'
  )

  const updateDescription = async () => {
    setIsEditingDescription(false)
    if (projectDescription) {
      const body = {
        description: projectDescription,
      }
      await updateProject(body)
    }
  }

  useEffect(() => {
    setProjectName(projectData.name || 'Project name')
    setProjectDescription(
      projectData.description || 'Add the description of your project here.'
    )
  }, [projectData])

  /**************** IMAGE PROPERTIES ****************/
  const [mainImage, setMainImage] = useState(
    projectData.MainImage
      ? constants.BACKEND_URL + projectData.MainImage.path
      : placeHolder
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setComponents(projectData.components)
    setMainImage(
      projectData.MainImage
        ? constants.BACKEND_URL + projectData.MainImage.path
        : placeHolder
    )
  }, [projectData])

  const fallbackImage = () => {
    setMainImage(placeHolder)
  }

  const toggle = () => {
    setOpen(!open)
  }

  const updateImage = (newImage) => {
    connectMainImage(newImage)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        sx={{ p: 3 }}
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: 'auto',
          padding: '30px 5%',
        }}
      >
        <Grid item xs={12}>
          {!isEditingTitle ? (
            <Button
              onClick={() => setIsEditingTitle(true)}
              style={{ textTransform: 'none' }}
            >
              <Typography
                width="fit-content"
                variant="h2"
                color="primary"
                gutterBottom
              >
                {projectName}
              </Typography>
            </Button>
          ) : (
            <TextField
              label="Project name"
              variant="standard"
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={updateTitle}
              value={projectName}
              autoFocus={true}
            />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            margin: '0 auto 30px auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ImageHandler open={open} toggle={toggle} callback={updateImage} />
          <Button width="80%" onClick={toggle}>
            <Box
              component={'img'}
              margin="auto"
              width="90%"
              maxWidth="900px"
              maxHeight="500px"
              src={mainImage}
              onError={fallbackImage}
              alt={'Project Image'}
            />
          </Button>
        </Grid>

        <Grid container padding="0 0 30px 0" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              width="fit-content"
              variant="h4"
              color="primary"
              margin="0 0 10px 0"
            >
              Description
            </Typography>
            {!isEditingDescription ? (
              <Button
                onClick={() => setIsEditingDescription(true)}
                style={{
                  textTransform: 'none',
                  textAlign: 'left',
                }}
              >
                <Typography width="fit-content" padding="0 24px" color="black">
                  {projectData.description ||
                    'Write a short description of your project here!'}
                </Typography>
              </Button>
            ) : (
              <TextField
                onChange={(e) => setProjectDescription(e.target.value)}
                onBlur={updateDescription}
                value={projectDescription}
                margin="dense"
                variant="outlined"
                fullWidth
                multiline
                autoFocus
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              width="fit-content"
              variant={'h4'}
              color="primary"
              margin="0 0 10px 0"
            >
              Skills
            </Typography>
            <SkillContainer projectId={projectData.id} />
          </Grid>
        </Grid>

        <AddComponent
          create={create}
          index={-2}
          distance={2}
          prevIndex={null}
          nextIndex={null}
        />

        {components.map((component, i, list) => (
          <div style={{ width: '100%' }} key={component.id}>
            <ComponentFactory
              component={component}
              update={update}
              remove={remove}
            />
            {list[i + 1] ? (
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <MoveComponent
                    id={list[i + 1].id}
                    move={move}
                    prevIndex={component.index - 2}
                  />
                </Grid>
                <Grid item xs={8}>
                  <AddComponent
                    create={create}
                    index={
                      list[i + 1]
                        ? list[i].index +
                          (list[i + 1].index - list[i].index) / 2
                        : component.index + 10
                    }
                    distance={
                      list[i + 1] ? (list[i + 1].index - list[i].index) / 2 : 10
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <MoveComponent
                    id={component.id}
                    move={move}
                    nextIndex={list[i + 1].index + 2}
                  />
                </Grid>
              </Grid>
            ) : (
              <AddComponent
                id={component.id}
                create={create}
                index={
                  list[i + 1]
                    ? list[i].index + (list[i + 1].index - list[i].index) / 2
                    : component.index + 10
                }
                distance={
                  list[i + 1] ? (list[i + 1].index - list[i].index) / 2 : 10
                }
              />
            )}
          </div>
        ))}
      </Grid>
    </Box>
  )
}
Project.componentName = 'Project'

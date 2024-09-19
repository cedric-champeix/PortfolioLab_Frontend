import { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoints } from '../../../data/endpoints.ts'
import { ImageObj } from '../../../types/entities/Image.ts';
import { Project } from '../../../types/entities/Project.ts';

export const useProject = (projectId: string) => {
  const defaultProject: Project = {
    id: '',
    name: '',
    description: '',
    visible: false,
    contributors: [],
    components: [],
    MainImage: <any>{},
    MainImageId: '',
    projectImages: [],
    projectImagesIds: [],
    skills: [],
    skillIds: [],
    userId: ''
  }

  const [projectData, setProjectData] = useState<Project>(defaultProject)

  const url = endpoints.projectsEndpoint + '/' + projectId

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
      withCredentials: true,
    })
      .then((response) => {
        setProjectData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const updateProject = async (body: {name?: string, description?: string, contributors?: string[]}) => {
    axios({
      url: `${url}`,
      method: 'PUT',
      withCredentials: true,
      data: body,
    })
      .then((res) => {
        setProjectData(res.data)
      })
      .catch((error) => {
        console.error('Error when updating project: ', error)
      })
  }

  const connectMainImage = (image: ImageObj) => {
    axios({
      url: `${url}/mainImage/${image.id}`,
      method: 'PUT',
      withCredentials: true,
    })
      .then(() => {
        setProjectData({ ...projectData, MainImage: image })
      })
      .catch((error) => {
        console.error('Error when connecting MainImage: ', error)
      })
  }

  const disconnectMainImage = () => {
    axios({
      url: `${url}/mainImage`,
      method: 'PUT',
      withCredentials: true,
    })
      .then(() => {
        setProjectData({ ...projectData, MainImage: <any>{} })
      })
      .catch((error) => {
        console.error('Error when disconnecting MainImage: ', error)
      })
  }

  return {
    projectData,
    setProjectData,
    updateProject,
    connectMainImage,
    disconnectMainImage,
  }
}

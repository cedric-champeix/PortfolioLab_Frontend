import { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoints } from '../../../data/endpoints.js'

export const useProject = (projectId) => {
  const defaultProject = {
    resumeId: null,
    description: '',
    visible: false,
    contributors: [],
    MainImage: {},
    ProjectImages: [],
    components: [],
    skills: [],
  }

  const [projectData, setProjectData] = useState(defaultProject)

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

  const updateProject = async (body) => {
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

  const connectMainImage = (image) => {
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
        setProjectData({ ...projectData, MainImage: null })
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

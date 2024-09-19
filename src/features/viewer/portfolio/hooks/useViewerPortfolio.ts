import { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoints } from '../../../../data/endpoints.ts'
import { Project } from '../../../../types/entities/Project.ts'

export const useViewerPortfolio = (username: string) => {
  const [projects, setProjects] = useState<Project[]>([])

  const url = endpoints.viewer.portfolioEndpoint(username)

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
      withCredentials: true,
    })
      .then((response) => {
        console.log('This is the project data: ', response.data)
        setProjects(response.data)
      })
      .catch((error) => {
        console.error('Couldn\'t get projects: ', error)
      })
  }, [])

  return { projects }
}

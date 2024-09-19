import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../../../../data/endpoints.ts';
import { ImageObj } from '../../../../types/entities/Image.ts';
import { Project } from '../../../../types/entities/Project.ts';

export const useViewerProject = (username: string, projectId: string) => {
  const defaultProject: Project = {
    id: projectId,
    userId: '',
    name: '',
    description: '',
    visible: true,
    contributors: [],
    MainImage: <ImageObj>{},
    MainImageId: '',
    projectImagesIds: [],
    projectImages: [],
    components: [],
    skills: [],
    skillIds: [],
  };

  const [project, setProject] = useState<Project>(defaultProject);
  const [projectError, setProjectError] = useState(false);

  const url = endpoints.viewer.projectEndpoint(username, projectId);

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
      withCredentials: true,
    })
      .then((response) => {
        console.log('This is the project data: ', response.data);
        setProjectError(false);
        setProject(response.data);
      })
      .catch((error) => {
        setProjectError(true);
        console.error("Couldn't get projects: ", error);
      });
  }, []);

  return { project, projectError };
};

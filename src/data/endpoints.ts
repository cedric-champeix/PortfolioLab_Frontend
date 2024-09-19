const baseUrl = 'http://localhost:8080';

export const endpoints = {
  contactsEndpoint: baseUrl + '/editor/contacts',
  resumeEndpoint: baseUrl + '/editor/resume',
  resumePreviewEndpoint: baseUrl + '/editor/resume/preview',
  resumeImageEndpoint: baseUrl + '/editor/resume/image',
  experienceEndpoint: baseUrl + '/editor/experiences',
  educationEndpoint: baseUrl + '/editor/formations',
  hobbiesEndpoint: baseUrl + '/editor/hobbies',
  languageEndpoint: baseUrl + '/editor/languages',
  skillsEndpoints: baseUrl + '/editor/skills',
  projectsEndpoint: baseUrl + '/editor/projects',
  componentsEndpoints: (projectId: string) =>
    baseUrl + `/editor/projects/${projectId}/components`,
  imagesEndpoint: baseUrl + '/editor/images',
  viewer: {
    resumeEndpoint: (username: string) =>
      baseUrl + `/viewer/${username}/resume`,
    portfolioEndpoint: (username: string) =>
      baseUrl + `/viewer/${username}/projects`,
    projectEndpoint: (username: string, projectId: string) =>
      baseUrl + `/viewer/${username}/projects/${projectId}`,
  },
};

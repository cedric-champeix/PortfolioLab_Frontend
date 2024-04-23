const baseUrl = "http://localhost:8080"
export const endpoints = {
    contactsEndpoint: baseUrl + "/editor/contacts",
    resumeEndpoint: baseUrl + "/editor/resume",
    resumeImageEndpoint: baseUrl + "/editor/resume/image",
    experienceEndpoint: baseUrl + "/editor/experiences",
    formationEndpoint: baseUrl + "/editor/formations",
    hobbiesEndpoint: baseUrl + "/editor/hobbies",
    languageEndpoint: baseUrl + "/editor/languages",
    skillsEndpoints: baseUrl + "/editor/skills",
    projectsEndpoint: baseUrl + "/editor/projects",
    componentsEndpoints: (projectId) => baseUrl + `/editor/projects/${projectId}/components`,
    imagesEndpoint: baseUrl + "/editor/images",
    viewer: {
        portfolioEndpoint: (username) => baseUrl + `/viewer/${username}/projects`,
        projectEndpoint: (username, projectId) => baseUrl + `/viewer/${username}/projects/${projectId}`
    }
}
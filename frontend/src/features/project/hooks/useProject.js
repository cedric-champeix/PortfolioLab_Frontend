import {useEffect, useState} from "react";
import axios from "axios";
import {endpoints} from "../../../data/endpoints.js";

export const useProject = (projectId) => {

    const defaultProject = {
        resumeId: null,
        description: "",
        contributors: [],
        MainImage: {},
        ProjectImages: [],
        components: [],
        skills: []
    }

    const [projectData, setProjectData] = useState(defaultProject);

    const url = endpoints.projectsEndpoint + "/" + projectId

    useEffect(() => {

        axios({
            url: url,
            method: 'GET',
            withCredentials: true
        }).then(response => {
            // console.log("This is the project data: ", response.data)
            setProjectData(response.data)
        }).catch(error => {
            console.error(error)
        })

    }, []);

    const updateProject = async (id, body) => {
        axios({
            url: `${url}/${id}`,
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data: formData
        }).then((res) => {
            setProjects(projects.map(project =>
                project.id === id ? res.data : project
            ))
        }).catch((error) => {
            console.error("Error when updating project: ", error)
        })
    }

    const connectMainImage = (image) => {
        axios({
            url: `${url}/mainImage/${image.id}`,
            method: "PUT",
            withCredentials: true
        }).then((res) => {
            setProjectData({...projectData, MainImage: image})
        }).catch((error) => {
            console.error("Error when connecting MainImage: ", error)
        })
    }

    const disconnectMainImage = () => {
        axios({
            url: `${url}/mainImage`,
            method: "PUT",
            withCredentials: true
        }).then((res) => {
            setProjectData({...projectData, MainImage: null})
        }).catch((error) => {
            console.error("Error when disconnecting MainImage: ", error)
        })
    }

    return {projectData, setProjectData, updateProject, connectMainImage, disconnectMainImage}
}
import {useEffect, useState} from "react";
import {endpoints} from "../../../../data/endpoints.js";
import axios from "axios";


export const useViewerProject = (username, projectId) => {

    const defaultProject = {
        resumeId: null,
        description: "",
        contributors: [],
        MainImage: {},
        ProjectImages: [],
        components: [],
        skills: []
    }

    const [project, setProject] = useState(defaultProject)

    const url = endpoints.viewer.projectEndpoint(username, projectId)

    useEffect(() => {
        axios({
            url: url,
            method: 'GET',
            withCredentials: true
        }).then(response => {
            console.log("This is the project data: ", response.data)
            setProject(response.data)
        }).catch(error => {
            console.error("Couldn't get projects: ", error)
        })
    }, []);


    return {project};
}

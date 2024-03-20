import {useEffect, useState} from "react";
import axios from "axios";

export const useProject = (projectId) => {

    const defaultProject = {
        resumeId: null,
        description: "",
        contributors: [],
        components: [],
        ProjectImages: [],
        skills: []
    }

    const [projectData, setProjectData] = useState(defaultProject);

    const url = `http://localhost:8080/editor/projects/${projectId}`

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

    return {projectData, setProjectData}
}
import {useEffect, useState} from "react";
import {endpoints} from "../../../data/endpoints.js";
import axios from "axios";


export const useProjects = () => {

    const [projects, setProjects] = useState([])

    const url = endpoints.projectsEndpoint

    useEffect(() => {
        axios({
            url: url,
            method: 'GET',
            withCredentials: true
        }).then(response => {
            console.log("This is the project data: ", response.data.projects)
            setProjects(response.data.projects)
        }).catch(error => {
            console.error("Couldn't get projects: ", error)
        })
    }, []);

    const create = async (file, body) => {
        const formData = new FormData()
        formData.append("data", JSON.stringify(body))
        if (file)
            formData.append("projectMainImage", file)
        console.log("BODY: ", body)
        console.log("FORM_DATA: ", formData)

        await axios({
            url: url,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then((res) => {
            setProjects([...projects, res.data])
        }).catch((error) => {
            console.error("Error when creating project: ", error)
        })

    }

    const update = async (id, file, body) => {
        const formData = new FormData()
        formData.append("data", JSON.stringify(body))
        if (file)
            formData.append("projectMainImage", file)

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

    const remove = async (id) => {
        axios({
            url: `${url}/${id}`,
            method: "DELETE",
            withCredentials: true
        }).then((res) => {
            setProjects(projects.filter(project => {
                return project.id !== id
            }))
        }).catch((error) => {
            console.error("Error when deleting project: ", error)
        })
    }


    return {projects, setProjects, create, update, remove};
}

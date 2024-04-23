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
            console.log("This is the project data: ", response.data)
            setProjects(response.data)
        }).catch(error => {
            console.error("Couldn't get projects: ", error)
        })
    }, []);

    const create = async (body) => {

        await axios({
            url: url,
            method: 'POST',
            withCredentials: true,
            data: body
        }).then((res) => {
            setProjects([...projects, res.data])
        }).catch((error) => {
            console.error("Error when creating project: ", error)
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


    return {projects, setProjects, create, remove};
}

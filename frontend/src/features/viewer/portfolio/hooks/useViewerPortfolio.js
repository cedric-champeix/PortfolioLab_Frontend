import {useEffect, useState} from "react";
import {endpoints} from "../../../../data/endpoints.js";
import axios from "axios";


export const useViewerPortfolio = (username) => {

    const [projects, setProjects] = useState([])

    const url = endpoints.viewer.portfolioEndpoint(username)

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


    return {projects};
}

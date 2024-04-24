import {useEffect, useState} from "react";
import {endpoints} from "../../../../data/endpoints.js";
import axios from "axios";

export const useViewerResume = (username) => {

    const defaultResume = {
        firstName: "",
        lastName: "",
        resume: {
            description: "",
            skills: [],
            experiences: [],
            formations: [],
            languages: [],
            hobbies: [],
            contacts: [],
            Image: {
                path: ""
            }
        }
    }

    const [userResume, setUserResume] = useState(defaultResume)

    const url = endpoints.viewer.resumeEndpoint(username)

    useEffect(() => {
        axios({
            url: url,
            method: 'GET'
        }).then(response => {
            console.log("This is the resume data: ", response.data)
            setUserResume(response.data)
        }).catch(error => {
            console.error("Could not get resume: ", error)
        })
    }, []);


    return {userResume};
}

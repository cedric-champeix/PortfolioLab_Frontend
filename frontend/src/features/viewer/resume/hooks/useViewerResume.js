import {useEffect, useState} from "react";
import {endpoints} from "../../../../data/endpoints.js";
import axios from "axios";

export const useViewerResume = (username) => {

    const defaultResume = {
        firstName: "",
        lastName: "",
        resume: {
            description: "",
            contacts: [],
            experiences: [],
            formations: [],
            skills: [],
            languages: [],
            hobbies: [],
            Image: {
                path: ""
            }
        },
        published: false
    }

    const [userResume, setUserResume] = useState(defaultResume)

    const url = endpoints.viewer.resumeEndpoint(username)

    useEffect(() => {
        axios({
            url: url,
            method: 'GET'
        }).then(response => {
            //Here, we check that the resume is
            if(response.data.published) {
                setUserResume(response.data)
            }

        }).catch(error => {
            console.error("Could not get resume: ", error)
        })
    }, []);


    return {userResume};
}

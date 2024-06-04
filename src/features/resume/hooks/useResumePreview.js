import {useEffect, useState} from "react";
import {endpoints} from "../../../data/endpoints.js";
import axios from "axios";

export const useResumePreview = () => {

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

    const [resumePreview, setResumePreview] = useState(defaultResume)

    const url = endpoints.resumePreviewEndpoint

    useEffect(() => {
        axios({
            url: url,
            method: 'GET',
            withCredentials: true
        }).then(response => {
            setResumePreview(response.data)
        }).catch(error => {
            console.error("Could not get resume: ", error)
        })
    }, []);


    return {resumePreview};
}

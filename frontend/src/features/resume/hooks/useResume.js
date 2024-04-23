import {useEffect, useState} from "react";
import axios from "axios";

export const useResume = () => {

    const defaultResume = {resumeId: null, description: "", image: ""}

    const [resumeData, setResumeData] = useState(defaultResume);

    const url = "http://localhost:8080/editor/resume"

    useEffect(() => {
        const fetchData =   () => {
            return axios({
                url: url,
                method: 'GET',
                withCredentials: true
            }).then(response => {
                return response
            }).catch(error => {
                console.error(error)
            })
        }
        fetchData().then(response => {
            setResumeData(response.data)
        })

        //console.log("Updated resume data : ")
        //console.log(resumeData)
    }, [url]);

    const updateResumeDescription = async (description) => {

        const data = {
            description: description,
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            console.log("Update resume")
            return fetch.data
        }
        console.error(fetch.status, fetch.data.message)

    }

    const updateResumeTitle = async (title) => {
        const data = {
            title: title,
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            console.log("Update resume")
            return fetch.data
        }
        console.error(fetch.status, fetch.data.message)
    }

    const resetResume = async () => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setResumeData(fetch.data)
            console.log(resumeData)
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }


    return {resumeData, setResumeData, updateResumeTitle, updateResumeDescription, resetResume}
}
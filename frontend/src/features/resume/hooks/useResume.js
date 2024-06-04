import {useEffect, useState} from "react";
import axios from "axios";

export const useResume = () => {

    const defaultResume = {id: null, description: "", image: ""}

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

    const updateResumeDescription = (description) => {

        const data = {
            description: description,
        }

        axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'PUT',
            withCredentials: true,
            data: data
        }).then((fetch) => {
            setResumeData({
                ...resumeData,
                description: fetch.data.description
            })
        }).catch((err) => {
            console.error(err)
        })

    }

    const updateResumeTitle = async (title) => {
        const data = {
            title: title,
        }

        axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'PUT',
            withCredentials: true,
            data: data
        }).then((fetch) => {
            setResumeData({
                ...resumeData,
                title: fetch.data.title
            })
        }).catch((err) => {
            console.error(err)
        })
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
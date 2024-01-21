import {useState} from "react";
import axios from "axios";

export const useResume = () => {

    const defaultResume = {resumeId: null, description: "", image: "", languages: []}

    const [resumeData, setResumeData] = useState(defaultResume);

    const getResume = async () => {
        const fetch = await axios({
            url: "http://localhost:8080/editor/resume",
            method: 'GET',
            withCredentials: true
        });

        if (fetch.status === 200) {
            return fetch.data
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateResume = async (description, languages, hobbies) => {
        const data = {
            description: description,
            languages: languages,
            hobbies: hobbies,
        }
        console.log("Update resume")

        const fetch = await axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            return fetch.data
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const resetResume = async (setSkillsData, setExperiencesData, setFormationsData, setContactsData) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/resume`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setResumeData(defaultResume)

            setSkillsData([])
            setExperiencesData([])
            setFormationsData([])
            setContactsData([])
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    return {resumeData, setResumeData, getResume, updateResume, resetResume}
}
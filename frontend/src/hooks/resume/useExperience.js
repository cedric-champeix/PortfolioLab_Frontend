import {useState} from "react";
import axios from "axios";

export const useExperience = () => {


    const [experiencesData, setExperiencesData] = useState([]);

    const createExperience = async (title, company, description, startDate, endDate, resumeId) => {

        const data = {
            title: title,
            company: company,
            description: description,
            startDate: startDate,
            endDate: endDate,
            resumeId: resumeId
        }

        const fetch = await axios({
            url: "http://localhost:8080/editor/experience",
            method: 'POST',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setExperiencesData(
                [
                    ...experiencesData,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateExperience = async (id, title, company, description, startDate, endDate) => {
        const data = {
            title: title,
            company: company,
            description: description,
            startDate: startDate,
            endDate: endDate,
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/experience/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setExperiencesData(
                experiencesData.map(experience =>
                    experience.id === id ? {...fetch.data} : experience
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const removeExperience = async (id) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/experience/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setExperiencesData(experiencesData.filter(experience => {
                return experience.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }

    const clear = () => {
        setExperiencesData([]);
    }

    return {experiencesData, setExperiencesData, createExperience, updateExperience, removeExperience, clear}
}
import {useState} from "react";

export const useExperience = () => {


    const [experiencesData, setExperiencesData] = useState([]);

    const createExperience = (title, company, description, startDate, endDate) => {
        setExperiencesData(
            [
                ...experiencesData,
                {
                    title: title,
                    company: company,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                }]
        )
    }

    const updateExperience = (oldTitle, title, company, description, startDate, endDate) => {
        setExperiencesData(
            experiencesData.map(formation =>
                formation.title === oldTitle ? {
                    title: title,
                    company: company,
                    description: description,
                    startDate: startDate,
                    endDate: endDate
                } : formation
            )
        )
    }

    const removeExperience = (title) => {
        setExperiencesData(experiencesData.filter(experience => {
            return experience.title !== title
        }))
    }

    const clear = () => {
        setExperiencesData([]);
    }

    return {experiencesData, setExperiencesData, createExperience, updateExperience, removeExperience, clear}
}
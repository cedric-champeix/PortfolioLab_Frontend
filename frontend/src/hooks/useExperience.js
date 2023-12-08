import {useState} from "react";
import {skillData} from "../data/skillData.js";

export const useExperience = () => {


    const [experienceData, setExperienceData] = useState([]);

    const addExperience = (name) => {
        setExperienceData(
            [
                ...experienceData,
                {
                    name: name,

                }]
        )
    }

    const removeExperience = (name) => {
        setExperienceData(experienceData.filter(item => {
            return item.name !== name
        }))
    }

    const clear = () => {
        setExperienceData([]);
    }

    return {experienceData, addExperience, removeExperience, clear, setExperienceData}
}
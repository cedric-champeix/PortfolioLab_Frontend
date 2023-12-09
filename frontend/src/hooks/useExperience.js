import {useState} from "react";
import {skillData} from "../data/skillData.js";

export const useExperience = () => {


    const [experiencesData, setExperiencesData] = useState([]);

    const addExperience = (name) => {
        setExperiencesData(
            [
                ...experiencesData,
                {
                    name: name,

                }]
        )
    }

    const removeExperience = (name) => {
        setExperiencesData(experiencesData.filter(item => {
            return item.name !== name
        }))
    }

    const clear = () => {
        setExperiencesData([]);
    }

    return {experiencesData, addExperience, removeExperience, clear, setExperiencesData}
}
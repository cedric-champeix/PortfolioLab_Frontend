import {useState} from "react";

export const useSkills = (initialState) => {

    const [skillsData, setSkillsData] = useState(initialState);

    const addSkill = (name, description, mastery, isSoft) => {
        setSkillsData(
            [
            ...skillsData,
            {
                name: name,
                description: description,
                mastery: mastery,
                isSoft: isSoft
            }]
        )
    }

    const removeSkill = (name) => {
        let newData = skillsData.filter(item => item.name!==name);
        console.log(newData)
        setSkillsData(newData);
    }

    const clear = () => {
        setSkillsData([]);
    }

    return {skillsData, addSkill, removeSkill, clear}
}
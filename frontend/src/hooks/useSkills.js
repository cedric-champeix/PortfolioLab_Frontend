import {useState} from "react";
import {skillData} from "../data/skillData.js";

export const useSkills = () => {


    const [skillsData, setSkillsData] = useState(skillData);

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
        let countBef = skillsData.length;
        setSkillsData(skillsData.filter(item => {
            return item.name !== name
        }))

        let countAft = skillsData.length;
        if(countAft-countBef === 0) console.log("No skill removed")

    }

    const clear = () => {
        setSkillsData([]);
    }

    return {skillsData, addSkill, removeSkill, clear, setSkillsData}
}
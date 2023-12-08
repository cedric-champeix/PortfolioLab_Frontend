import {createContext, useContext, useState} from 'react';
import {skillData} from "../data/skillData.js";

export const SkillsContext = createContext(null);

export const SkillsProvider = ({children, data}) => {

    const [skillsData, setSkillsData] = useState(data);

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
        console.log("Data before removing " + skillsData)
        setSkillsData(skillsData.filter(item => {
            return item.name !== name
        }))
    }

    const clear = () => {
        setSkillsData([]);
    }

    return <SkillsContext.Provider value={{skillsData, setSkillsData, addSkill, removeSkill, clear}}>
        {children}
    </SkillsContext.Provider>
}

export const useSkills = () => useContext(SkillsContext);
import {useState} from "react";
import axios from "axios";

export const useSkills = () => {


    const [skillsData, setSkillsData] = useState([]);

    const getSkillsIds = () => {
        return skillsData.map(item => item.id)
    }

    const createSkill = async (name, description, mastery, isSoft, resumeId, project) => {
        const data = {
            name: name,
            description: description,
            mastery: mastery,
            isSoft: isSoft,
            resumeId: resumeId,
            Projects: project ? [project] : []
        }

        const fetch = await axios({
            url: "http://localhost:8080/editor/skill",
            method: 'POST',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setSkillsData(
                [
                    ...skillsData,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateSkill = async (id, name, description, mastery, isSoft) => {
        const data = {
            name: name,
            description: description,
            mastery: mastery,
            isSoft: isSoft
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/skill/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setSkillsData(
                skillsData.map(skill =>
                    skill.id === id ? {...fetch.data} : skill
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }


    }

    const removeSkill = async (id) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/skill/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setSkillsData(skillsData.filter(item => {
                return item.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }

    const clear = () => {
        setSkillsData([]);
    }

    return {skillsData, setSkillsData, getSkillsIds, createSkill, removeSkill, updateSkill, clear}
}
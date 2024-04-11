import {useEffect, useState} from "react";
import axios from "axios";
import {endpoints} from "../../../data/endpoints.js";


export const useSkills = (resumeId, projectId) => {
    const [skills, setSkills] = useState([])

    const url = endpoints.skillsEndpoints

    useEffect(() => {
        console.log("SKILLS", skills)
        if (resumeId !== "AWAITING" && projectId !== "AWAITING")
            fetchSkills()
    }, [resumeId, projectId]);

    const fetchSkills = () => {
        const data = {
            ...(resumeId && {resumeId: resumeId}),
            ...(projectId && {projectId: projectId})
        }

        axios({
            url: url,
            method: 'GET',
            withCredentials: true,
            params: data
        }).then(response => {
            setSkills(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    const create = (name, description, isSoft, cb) => {

        const body = {
            name: name,
            description: description,
            isSoft: isSoft
        }

        axios({
            url: `${url}`,
            method: 'POST',
            withCredentials: true,
            data: body
        }).then((res) => {
            setSkills(
                [
                    ...skills,
                    res.data
                ]
            )
            cb(res.data)
        }).catch((err) => {
            console.error("Error when creating skill: ", err)
            cb(null)
        });

    }

    const update = (id, name, description, isSoft) => {
        const body = {
            name: name,
            description: description,
            isSoft: isSoft
        }

        axios({
            url: `${url}/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: body
        }).then((res) => {
            setSkills(
                skills.map(item =>
                    item.id === id ? {...res.data} : item
                )
            )
        }).catch((err) => {
            console.error("Error when updating skill: ", err)
        });
    }

    const remove = (id) => {
        axios({
            url: `${url}/${id}`,
            method: 'DELETE',
            withCredentials: true
        }).then(() => {
            setSkills(skills.filter(experience => {
                return experience.id !== id
            }))
        }).catch((err) => {
            console.error("Error when deleting skill: ", err)
        });
    }

    const connectToResume = (skill) => {
        const index = skills.findIndex(_skill => {
            return skill.id === _skill.id
        })

        if (index === -1) {
            axios({
                url: `${endpoints.resumeEndpoint}/skills/${skill.id}`,
                method: "PUT",
                withCredentials: true
            }).then(() => {
                setSkills([
                    ...skills,
                    skill
                ])
            }).catch((err) => {
                console.error("Error when trying to disconnect skill: ", err)
            })
        }
    }

    const disconnectFromResume = (skillId) => {
        axios({
            url: `${endpoints.resumeEndpoint}/skills/${skillId}`,
            method: "DELETE",
            withCredentials: true
        }).then(() => {
            setSkills(
                skills.filter(skill => {
                    return skill.id !== skillId
                })
            )
        }).catch((err) => {
            console.error("Error when trying to disconnect skill: ", err)
        })
    }

    const connectToProject = (skill) => {
        const index = skills.findIndex(_skill => {
            return skill.id === _skill.id
        })

        if (index === -1) {
            axios({
                url: `${endpoints.projectsEndpoint}/${projectId}/skills/${skill.id}`,
                method: "PUT",
                withCredentials: true
            }).then(() => {
                setSkills([
                    ...skills,
                    skill
                ])
            }).catch((err) => {
                console.error("Error when trying to disconnect skill: ", err)
            })
        }
    }

    const disconnectFromProject = (skillId) => {
        axios({
            url: `${endpoints.projectsEndpoint}/${projectId}/skills/${skillId}`,
            method: "DELETE",
            withCredentials: true
        }).then(() => {
            setSkills(
                skills.filter(skill => {
                    return skill.id !== skillId
                })
            )
        }).catch((err) => {
            console.error("Error when trying to disconnect skill: ", err)
        })
    }


    return {
        skills,
        fetchSkills,
        update,
        create,
        remove,
        connectToResume,
        disconnectFromResume,
        connectToProject,
        disconnectFromProject
    }
}
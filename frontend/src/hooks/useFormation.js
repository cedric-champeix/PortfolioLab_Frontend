import {useState} from "react";
import axios from "axios";

export const useFormation = () => {


    const [formationsData, setFormationsData] = useState([]);

    const createFormation = async (formationName, universityName, startDate, endDate, resumeId) => {
        const data = {
            formationName: formationName,
            universityName: universityName,
            startDate: startDate,
            endDate: endDate,
            resumeId: resumeId
        }

        const fetch = await axios({
            url: "http://localhost:8080/editor/formation",
            method: 'POST',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setFormationsData(
                [
                    ...formationsData,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateFormation = async (id, formationName, universityName, startDate, endDate) => {
        const data = {
            formationName: formationName,
            universityName: universityName,
            startDate: startDate,
            endDate: endDate,
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/formation/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setFormationsData(
                formationsData.map(formation =>
                    formation.id === id ? {...fetch.data} : formation
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const removeFormation = async (id) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/formation/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setFormationsData(formationsData.filter(formation => {
                return formation.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }

    const clear = () => {
        setFormationsData([]);
    }

    return {formationsData, setFormationsData, createFormation, updateFormation, removeFormation, clear}
}
import {useState} from "react";

export const useFormation = () => {


    const [formationsData, setFormationsData] = useState([]);

    const createFormation = (formationName, universityName, startDate, endDate) => {
        setFormationsData(
            [
                ...formationsData,
                {
                    formationName: formationName,
                    universityName: universityName,
                    startDate: startDate,
                    endDate: endDate
                }]
        )
    }

    const updateFormation = (oldFormationName, formationName, universityName, startDate, endDate) => {
        setFormationsData(
            formationsData.map(formation =>
                formation.formationName === oldFormationName ? {
                    formationName: formationName,
                    universityName: universityName,
                    startDate: startDate,
                    endDate: endDate
                } : formation
            )
        )
    }

    const removeFormation = (formationName) => {
        setFormationsData(formationsData.filter(formation => {
            return formation.formationName !== formationName
        }))
    }

    const clear = () => {
        setFormationsData([]);
    }

    return {formationsData, setFormationsData, createFormation, updateFormation, removeFormation, clear}
}
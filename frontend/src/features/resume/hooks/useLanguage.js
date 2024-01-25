import {useState} from "react";
import axios from "axios";

export const useLanguage = () => {


    const [languageData, setLanguageData] = useState([]);

    const createLanguage= async (name, level) => {

        const data = {
            name: name,
            level: level
        }

        const fetch = await axios({
            url: "http://localhost:8080/editor/language",
            method: 'POST',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setLanguageData(
                [
                    ...languageData,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateLanguage = async (name, id, level) => {
        const data = {
            id: id,
            name: name,
            level: level
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/language/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setLanguageData(
                languageData.map(language =>
                    language.id === id ? {...fetch.data} : language
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const removeLanguage = async (id) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/language/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            //filtering the state to remove element
            setLanguageData(languageData.filter(language => {
                return language.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }


    return {languageData, setLanguageData, createLanguage, updateLanguage, removeLanguage}
}
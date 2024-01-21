import {useState} from "react";
import axios from "axios";

export const useHobbies = () => {


    const [hobbiesData, setHobbiesData] = useState([]);

    const createHobbie = async (name) => {

        const data = {
            name: name,
        }

        const fetch = await axios({
            url: "http://localhost:8080/editor/hobbie",
            method: 'POST',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setHobbiesData(
                [
                    ...hobbiesData,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateHobbie = async (name, id) => {
        const data = {
            id: id,
            name: name,
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/hobbie/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setHobbiesData(
                hobbiesData.map(hobbie =>
                    hobbie.id === id ? {...fetch.data} : hobbie
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const removeHobbie = async (id) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/hobbie/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            //filtering the state to remove element
            setHobbiesData(hobbiesData.filter(hobbie => {
                return hobbie.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }


    return {hobbiesData, setHobbiesData, createHobbie, updateHobbie, removeHobbie}
}
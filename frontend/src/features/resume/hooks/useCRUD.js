import {useEffect, useState} from "react";
import axios from "axios";

/**
 * CRUD handler method
 * Specify an endpoint where to fetch the API
 *
 * @param url
 * @returns {{data: *[], update: ((function(*, *): Promise<void>)|*), create: ((function(*): Promise<void>)|*), remove: ((function(*): Promise<void>)|*)}}
 */
export const useCRUD = url => {

    const [data, setData] = useState([])

    useEffect(() => {
        //Fetches the data
        //Async callback
        const fetchData = async () => {
            return await axios({
                url: url,
                method: 'GET',
                withCredentials: true
            }).then(response => {
                setData(response.data)
            }).catch(error => {
                console.error(error)
            })
        }
        //Execute
        fetchData().then()
        console.log(data)

    }, [url]);

    const create = async (body) => {

        const fetch = await axios({
            url: `${url}`,
            method: 'POST',
            withCredentials: true,
            data: body
        });

        if (fetch.status === 200) {
            console.log(data)
            setData(
                [
                    ...data,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }

    }

    const update = async (id, body) => {
        const fetch = await axios({
            url: `${url}/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: body
        });

        if (fetch.status === 200) {
            setData(
                data.map(item =>
                    item.id === id ? {...fetch.data} : item
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const remove = async (id) => {
        const fetch = await axios({
            url: `${url}/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setData(data.filter(experience => {
                return experience.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }



    return {update,create,remove, data}
}
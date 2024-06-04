import {useEffect, useState} from "react";
import {endpoints} from "../../../data/endpoints.js";
import axios from "axios";


export const useComponent = (projectId, _components) => {

    const [components, setComponents] = useState(_components)

    const url = endpoints.componentsEndpoints(projectId)

    useEffect(() => {
        console.log("Reload...", components)
    }, [components]);

    const create = async (body) => {
        axios({
            url: url,
            method: "POST",
            withCredentials: true,
            data: body
        }).then((res) => {
            let newArr = [...components, res.data.component]

            if (res.data.indexUpdate)
                newArr = updateIndexes(newArr, res.data.indexes)

            newArr.sort((a, b) => a.index - b.index)
            setComponents(newArr)
        }).catch((error) => {
            console.error("Error when creating component: ", error)
        })

    }

    const update = async (id, body) => {
        axios({
            url: `${url}/${id}`,
            method: "PUT",
            withCredentials: true,
            data: body
        }).then((res) => {
            let newArr = components.map(component =>
                component.id === id ? res.data : component
            )

            if (res.data.indexUpdate)
                newArr = updateIndexes(newArr, res.data.indexes)

            newArr.sort((a, b) => a.index - b.index)
            setComponents(
                newArr
            )
        }).catch((error) => {
            console.error("Error when updating component: ", error)
        })
    }

    const move = async (id, body) => {
        axios({
            url: `${url}/${id}/move`,
            method: "PUT",
            withCredentials: true,
            data: body
        }).then((res) => {
            let newArr = components.map(component =>
                component.id === id ? res.data.component : component
            )
            
            if (res.data.indexUpdate)
                newArr = updateIndexes(newArr, res.data.indexes)


            newArr.sort((a, b) => a.index - b.index)
            setComponents(
                newArr
            )
        }).catch((error) => {
            console.error("Error when moving component: ", error)
        })
    }

    const remove = async (id) => {
        axios({
            url: `${url}/${id}`,
            method: "DELETE",
            withCredentials: true
        }).then(() => {
            setComponents(components.filter(component => {
                return component.id !== id
            }))
        }).catch((error) => {
            console.error("Error when deleting component: ", error)
        })
    }

    const updateIndexes = (arr, newIndexes) => {
        return arr.map(component => {
            component.index = newIndexes.find(newIndex => {
                return newIndex.id === component.id
            }).index
            return component
        })
    }


    return {components, setComponents, create, update, move, remove};
}

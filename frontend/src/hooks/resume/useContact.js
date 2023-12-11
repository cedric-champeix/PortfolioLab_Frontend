import {useState} from "react";
import axios from "axios";

export const useContact = () => {


    const [contactsData, setContactsData] = useState([]);

    const createContact = async (title, text, resumeId, project) => {

        const data = {
            title: title,
            text: text,
            resumeId: resumeId,
            Projects: project ? [project] : []
        }

        const fetch = await axios({
            url: "http://localhost:8080/editor/contact",
            method: 'POST',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setContactsData(
                [
                    ...contactsData,
                    fetch.data
                ]
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const updateContact = async (id, title, text) => {
        const data = {
            title: title,
            text: text
        }

        const fetch = await axios({
            url: `http://localhost:8080/editor/contact/${id}`,
            method: 'PUT',
            withCredentials: true,
            data: data
        });

        if (fetch.status === 200) {
            setContactsData(
                contactsData.map(contact =>
                    contact.id === id ? {...fetch.data} : contact
                )
            )
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const removeContact = async (id) => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/contact/${id}`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setContactsData(contactsData.filter(contact => {
                return contact.id !== id
            }))
        } else {
            console.error(fetch.data.message)
        }
    }


    return {contactsData, setContactsData, createContact, updateContact, removeContact}
}
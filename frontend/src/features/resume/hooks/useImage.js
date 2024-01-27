import {useState} from "react";
import axios from "axios";

export const useImage = () => {

    const [imageLink, setImageLink] = useState("src/assets/icons/blank-profile-picture.png");

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append("profilePicture", file)

        console.log(formData)
        const fetch = await axios({
            url: `http://localhost:8080/editor/resume/image`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        });

        if (fetch.status === 200) {
            setImageLink(fetch.data.image)
            return fetch.data.image
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    const deleteImage = async () => {
        const fetch = await axios({
            url: `http://localhost:8080/editor/resume/image`,
            method: 'DELETE',
            withCredentials: true
        });

        if (fetch.status === 200) {
            setImageLink(null)
        } else {
            console.error(fetch.status, fetch.data.message)
        }
    }

    return {imageLink, setImageLink, uploadImage, deleteImage}
}
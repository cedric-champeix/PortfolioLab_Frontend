import axios from "axios";
import {useAuth} from "../../hooks/useAuth.js";
import ReactJson from 'react-json-view'
import {useState} from "react";
export default function ViewResume() {

    const {userId} = useAuth()

    const [json, setJson] = useState({})
    const getResume = async ()  => {
        const fetch =  await axios({
            url: "http://localhost:8080/viewer/resume/" + userId,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        setJson(JSON.stringify(fetch))
    }

    getResume()

    return <>coucou
        <ReactJson src={JSON.parse(json)}></ReactJson>
    </>
}
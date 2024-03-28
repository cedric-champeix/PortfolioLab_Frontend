import axios from "axios";
import {useAuth} from "../../hooks/useAuth.js";
import React, {useEffect, useRef, useState} from "react";
import CV from 'react-cv'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialValues = {
    id: "",
    description: "",
    userId: "",
    skills: [],
    experiences: [],
    formations: [],
    languages: [],
    hobbies: [],
    contacts: []
}


export default function ViewResume() {

    const {userId} = useAuth()

    const [json, setJson] = useState(initialValues)
    const [contacts, setContacts] = useState([])
    const [skills, setSkills] = useState([])
    const cv = useRef()
    const getResume = async () => {
        const fetch = await axios({
            url: "http://localhost:8080/viewer/resume/" + userId,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        setJson(fetch.data)
        console.log(fetch.data.skills)
    }

    useEffect(() => {
        getResume().then()
        const element = cv.current
        console.log(element)
    }, []);

    useEffect(() => {
        console.log("Adapting contacts")
        setContacts(json.contacts.map(item => {

            return {
                type: item.title.toLowerCase().replace("address", "location"),
                value: item.text
            }
        }))
    }, [json]);


    useEffect(() => {
        setSkills(json.skills.map(item => {
            return item.name
        }))
    }, [json]);

    const handleDownloadPDF = () => {
        const input = document.getElementById("cvWrapper");
        console.log("component to save",input)
        // Specify the id of the element you want to convert to PDF
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, 200, 500);
            pdf.save('downloaded-file.pdf');
            // Specify the name of the downloaded PDF file
        });
    }


    return <>
        <div id={"cvWrapper"}>
            <CV ref={cv} personalData={{
                name: "Arnaud Endignous",
                title: 'Graduate software developper',
                image: 'https://media.licdn.com/dms/image/D4E03AQEhMxhrFIjr0w/profile-displayphoto-shrink_400_400/0/1710582570880?e=1717027200&v=beta&t=TAgvG9uMFTo9kdhFwL1HbHAtyJ4lQJ-e3tTCfHtkqZo',
                contacts: contacts
            }}

                sections={[
                    {
                        type: 'text',
                        title: 'Description',
                        content: json.description,
                        icon: 'usertie'
                    },
                    {
                        type: 'tag-list',
                        title: 'Skills',
                        icon: 'rocket',
                        items: skills
                    }
                ]}
                branding={false}
            >
            </CV>

        </div>


        <button onClick={handleDownloadPDF}>Save</button>
    </>
}
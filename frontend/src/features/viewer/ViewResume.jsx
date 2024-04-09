import axios from "axios";
import {useEffect, useRef, useState} from "react";
import CV from 'react-cv'
import "./viewResume.css"
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
    contacts: [],
    Image:{
        path: ""
    }
}


export default function ViewResume() {


    const [json, setJson] = useState(initialValues)
    const [contacts, setContacts] = useState([])
    const [skills, setSkills] = useState([])
    const [experiences, setExperiences] = useState([])
    const [education, setEducation] = useState([])
    const [image, setImage] = useState("https://placehold.co/400x400")
    const [hobbies, setHobbies] = useState([])
    const [languages, setLanguages] = useState([])

    const cv = useRef()
    const getResume = async () => {
        const fetch = await axios({
            url: "http://localhost:8080/viewer/resume/" + "65e0c68568dfe45fc40f0963",
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        setJson(fetch.data)
    }

    //Setting resume up
    useEffect(() => {
        getResume().then()

    }, []);

    //Adapting all needed information
    useEffect(() => {

        console.log(json)

        setContacts(json.contacts.map(item => {
            return {
                type: item.title.toLowerCase().replace("address", "location"),
                value: item.text
            }
        }))

        setExperiences(json.experiences.map(item => {
            return {
                title: item.title,
                description: item.description,
                authority: item.company,
                rightSide: item.startDate + '-' + (item.endDate || "ongoing")
            }
        }))

        setEducation(json.formations.map(item => {
            return {
                title: item.formationName,
                authority: item.universityName,
                rightSide: item.startDate + '-' + (item.endDate || "ongoing")
            }
        }))

        setSkills(json.skills.map(item => {
            return item.name
        }))

        setHobbies(json.hobbies.map(item => {
            return item.name
        }))

        setLanguages(json.languages.map(item => {
            return item.name + ' - ' + item.level
        }))

        console.log(json.Image)
        setImage("http://localhost:8080/" + json.Image.path)

    }, [json]);


    useEffect(() => {

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
        <div id={"cvWrapper"} style={{display: "flex", justifyContent:'center', width:'100%', marginTop: '8vh'} }>
            <CV ref={cv} personalData={{
                name: "Arnaud Endignous",
                title: 'Graduate software developper',
                image: image,
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
                        type: 'common-list',
                        title: 'Experiences',
                        icon: 'cubes',
                        items: experiences

                    },
                    {
                        type: 'common-list',
                        title: 'Education',
                        icon: 'book',
                        items: education

                    },
                    {
                        type: 'tag-list',
                        title: 'Skills',
                        icon: 'rocket',
                        items: skills
                    },
                    {
                        type: 'tag-list',
                        title: 'Hobbies',
                        icon: 'rocket',
                        items: hobbies
                    },
                    {
                        type: 'tag-list',
                        title: 'Languages',
                        icon: 'language',
                        items: languages
                    }
                ]}
                branding={false}
            >
            </CV>

        </div>
    </>
}
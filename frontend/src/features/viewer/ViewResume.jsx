import React, {useEffect, useRef, useState} from "react";
import CV from 'react-cv'
import "./viewResume.css"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ExportAction from "./ExportAction.jsx";
import PropTypes from "prop-types";


export default function ViewResume({userResume}) {

    const [description, setDescription] = React.useState("");
    const [contacts, setContacts] = useState([])
    const [skills, setSkills] = useState([])
    const [experiences, setExperiences] = useState([])
    const [education, setEducation] = useState([])
    const [image, setImage] = useState("https://placehold.co/400x400")
    const [hobbies, setHobbies] = useState([])
    const [languages, setLanguages] = useState([])

    const cv = useRef()

    //Adapting all needed information
    useEffect(() => {
        setDescription(userResume.resume.description)

        setContacts(userResume.resume.contacts.map(item => {
            return {
                type: item.title.toLowerCase().replace("address", "location"),
                value: item.text
            }
        }))

        setExperiences(userResume.resume.experiences.map(item => {
            return {
                title: item.title,
                description: item.description,
                authority: item.company,
                rightSide: item.startDate + '-' + (item.endDate || "ongoing")
            }
        }))

        setEducation(userResume.resume.formations.map(item => {
            return {
                title: item.formationName,
                authority: item.universityName,
                rightSide: item.startDate + '-' + (item.endDate || "ongoing")
            }
        }))

        setSkills(userResume.resume.skills.map(item => {
            return item.name
        }))

        setHobbies(userResume.resume.hobbies.map(item => {
            return item.name
        }))

        setLanguages(userResume.resume.languages.map(item => {
            return item.name + ' - ' + item.level
        }))

        setImage("http://localhost:8080/" + userResume.resume.Image.path)

    }, [userResume]);


    const handleDownloadPDF = () => {
        const input = document.getElementById("cvWrapper");
        console.log("component to save", input)
        // Specify the id of the element you want to convert to PDF

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, 0, 0);
            pdf.save('downloaded-resume.pdf');
            // Specify the name of the downloaded PDF file
        });
    }


    return <React.Fragment>
        <div id={"cvWrapper"} style={{display: "flex", justifyContent: 'center', width: '100%', marginTop: '8vh'}}>
            <CV ref={cv} personalData={{
                name: userResume.firstName + " " + userResume.lastName,
                title: userResume.resume.title,
                image: image,
                contacts: contacts
            }}

                sections={[
                    {
                        type: 'text',
                        title: 'Description',
                        content: description,
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
        <ExportAction/>
    </React.Fragment>
}
ViewResume.propTypes = {
    userResume: PropTypes.object,
}
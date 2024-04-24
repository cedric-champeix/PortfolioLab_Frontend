import React, {useEffect, useState} from "react";
import ReactCV from 'react-cv'
import "./viewResume.css"
import {Resolution, Margin, usePDF} from 'react-to-pdf';
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

export default function ViewResume({userResume}) {

    const [description, setDescription] = React.useState("");
    const [contacts, setContacts] = useState([])
    const [skills, setSkills] = useState([])
    const [experiences, setExperiences] = useState([])
    const [education, setEducation] = useState([])
    const [image, setImage] = useState("https://placehold.co/400x400")
    const [hobbies, setHobbies] = useState([])
    const [languages, setLanguages] = useState([])

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

    const pdfOptions = {
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.MEDIUM,
        filename: `${userResume.firstName}_${userResume.lastName}_CV.pdf`,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.NONE,
            // default is 'A4'
            format: 'A4'
        }
    };

    const {toPDF, targetRef} = usePDF(pdfOptions);

    return <React.Fragment>
        <div ref={targetRef} id={"cvWrapper"}
             style={{
                 display: 'flex', justifyContent: 'center', width: '80%',
                 height: "auto",
                 margin: "2vh auto",
                 overflow: "auto"
             }}>
            <ReactCV personalData={{
                name: `${userResume.firstName} ${userResume.lastName}`,
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
            </ReactCV>
        </div>
        <IconButton variant="contained"
                    color="primary"
                    sx={{position: "fixed", bottom: "4%", right: "4%"}}
                    onClick={() => toPDF()}>
            <DownloadForOfflineIcon sx={{fontSize: "70px"}}/>
        </IconButton>
    </React.Fragment>
}
ViewResume.propTypes = {
    userResume: PropTypes.object,
}
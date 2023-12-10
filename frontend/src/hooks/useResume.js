import {useState} from "react";

export const useResume = () => {


    const [resumeData, setResumeData] = useState({resumeId: null});

    return {resumeData, setResumeData}
}
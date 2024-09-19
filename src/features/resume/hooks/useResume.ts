import axios from 'axios';
import { useEffect, useState } from 'react';
import { Resume } from '../../../types/entities/Resume.ts';

export const useResume = () => {
  const defaultResume: Resume = {
    id: '',
    description: '',
    title: '',
    Image: <any>{},
    ImageId: '',
    userId: '',
    contacts: [],
    experiences: [],
    formations: [],
    hobbies: [],
    skills: [],
    languages: [],
    published: false,
  };

  const [resumeData, setResumeData] = useState<Resume>(defaultResume);

  const url = 'http://localhost:8080/editor/resume';

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
      withCredentials: true,
    })
      .then((response) => {
        setResumeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    //console.log("Updated resume data : ")
    //console.log(resumeData)
  }, [url]);

  const updateResumeDescription = (description: string) => {
    const data = {
      description: description,
    };

    axios({
      url: `http://localhost:8080/editor/resume`,
      method: 'PUT',
      withCredentials: true,
      data: data,
    })
      .then((fetch) => {
        setResumeData({
          ...resumeData,
          description: fetch.data.description,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateResumeTitle = (title: string) => {
    const data = {
      title: title,
    };

    axios({
      url: `http://localhost:8080/editor/resume`,
      method: 'PUT',
      withCredentials: true,
      data: data,
    })
      .then((fetch) => {
        setResumeData({
          ...resumeData,
          title: fetch.data.title,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetResume = async () => {
    const fetch = await axios({
      url: `http://localhost:8080/editor/resume`,
      method: 'DELETE',
      withCredentials: true,
    });

    if (fetch.status === 200) {
      setResumeData(fetch.data);
      console.log(resumeData);
    } else {
      console.error(fetch.status, fetch.data.message);
    }
  };

  return {
    resumeData,
    setResumeData,
    updateResumeTitle,
    updateResumeDescription,
    resetResume,
  };
};

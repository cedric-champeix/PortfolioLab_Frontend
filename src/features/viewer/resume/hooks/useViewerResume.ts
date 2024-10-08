import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../../../../data/endpoints.ts';

export const useViewerResume = (username: string) => {
  const defaultResume = {
    firstName: '',
    lastName: '',
    resume: {
      description: '',
      contacts: [],
      experiences: [],
      formations: [],
      skills: [],
      languages: [],
      hobbies: [],
      Image: {
        path: '',
      },
    },
    published: false,
  };

  const [userResume, setUserResume] = useState(defaultResume);
  const [resumeError, setResumeError] = useState(false);

  const url = endpoints.viewer.resumeEndpoint(username);

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        setUserResume(response.data);
        if (response.data.published) {
          setResumeError(false);
        } else {
          setResumeError(true);
        }
      })
      .catch((error) => {
        setResumeError(true);
        console.error('Could not get resume: ', error);
      });
  }, []);

  return { userResume, resumeError };
};

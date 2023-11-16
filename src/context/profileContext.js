import {createContext, useContext, useState} from 'react';

export const ProfileContext = createContext({});

export const ProfileProvider = ({profile, children}) => {
    const [currentProfile, setCurrentProfile] = useState(profile);

    return <ProfileContext.Provider value={{currentProfile, setCurrentProfile}}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext);
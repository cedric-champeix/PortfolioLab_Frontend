import {createContext, useContext, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({token, children}) => {

    const [currentJwt, setCurrentJwt] = useState(token);

    return <AuthContext.Provider value={{currentJwt, setCurrentJwt}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
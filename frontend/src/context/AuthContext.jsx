import {createContext, useContext, useState} from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export const AuthProvider = ({token, children}) => {

    const [currentJwt, setCurrentJwt] = useState(token);

    const logOut = () => {
        setCurrentJwt("")
        Cookies.remove("jwt_token")
    }

    return <AuthContext.Provider value={{currentJwt, setCurrentJwt, logOut}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
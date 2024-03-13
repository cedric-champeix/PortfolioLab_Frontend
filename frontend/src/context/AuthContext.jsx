import {createContext, useState} from 'react';
import Cookies from "js-cookie";
import {string} from "prop-types";

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

AuthProvider.propTypes = {
    token: string,
    children : () => {}
}
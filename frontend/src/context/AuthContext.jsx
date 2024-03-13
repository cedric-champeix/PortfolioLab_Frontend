import {createContext, useState} from 'react';
import Cookies from "js-cookie";
import {string} from "prop-types";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [username, setUsername] = useState("");

    const logOut = () => {
        Cookies.remove("jwt_token")
    }

    return <AuthContext.Provider value={{username, setUsername, logOut}}>
        {children}
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    token: string,
    children : () => {}
}
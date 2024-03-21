import {createContext, useState} from 'react';
import Cookies from "js-cookie";
import {string} from "prop-types";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    const logOut = () => {
        Cookies.remove("jwt_token")
        setUserId(null)
        setUsername(null)
    }

    return <AuthContext.Provider value={{username, setUsername,userId, setUserId, logOut}}>
        {children}
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    token: string,
    children : () => {}
}
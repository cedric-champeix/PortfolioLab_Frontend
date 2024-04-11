import {createContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {string} from "prop-types";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        console.log("Get profile info from storage")
        const cookie = Cookies.get('jwt_token')
        if(cookie) {
            //Get information
            console.log(localStorage.getItem("userId"))
            setUsername(localStorage.getItem("username") || "")
            setUserId(localStorage.getItem("userId") || "")
        }
    }, []);


    const logOut = () => {
        Cookies.remove("jwt_token")
        setUserId(null)
        setUsername(null)
        localStorage.removeItem("userId")
        localStorage.removeItem("username")

    }

    return <AuthContext.Provider value={{username, setUsername,userId, setUserId, logOut}}>
        {children}
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    token: string,
    children : () => {}
}
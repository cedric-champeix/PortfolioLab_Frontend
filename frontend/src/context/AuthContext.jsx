import {createContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {string} from "prop-types";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    useEffect(() => {
        console.log("Get profile info from storage")
        const cookie = Cookies.get('jwt_token')
        if (cookie) {
            setUserId(localStorage.getItem("userId") || "")

            axios({
                url: "http://localhost:8080/getUser",
                method: "GET",
                withCredentials: true
            }).then(fetch => {
                setUsername(fetch.data.username)
                setUserId(fetch.data.id)
                localStorage.setItem("userId", fetch.data.id)
                localStorage.setItem("username", fetch.data.username)
            })
        }
    }, []);


    const logOut = () => {
        Cookies.remove("jwt_token")
        setUserId(null)
        setUsername(null)
        localStorage.removeItem("userId")
        localStorage.removeItem("username")

    }

    return <AuthContext.Provider value={{username, setUsername, userId, setUserId, logOut}}>
        {children}
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: () => {}
}
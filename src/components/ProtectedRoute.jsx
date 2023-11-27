import {useAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute({routeType}) {

    const {currentJwt} = useAuth();


    const evaluatePass = () => {
        switch (routeType) {
            case "admin":
                return currentJwt !== "" && currentJwt !== undefined;
            case "auth":
                return currentJwt === "" || currentJwt === undefined;
        }
    }
    const path = () => {
        return routeType === "admin" ? "/register" : "/";
    }

    return (
        evaluatePass() ? <Outlet></Outlet> : <Navigate to={path()}></Navigate>
    )
}
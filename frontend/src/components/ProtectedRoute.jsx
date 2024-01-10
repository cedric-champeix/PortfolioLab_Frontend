import {useAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {string} from "prop-types";

export default function ProtectedRoute({routeType}) {
    const {currentJwt} = useAuth();


    const evaluatePass = () => {
        switch (routeType) {
            case "admin":
                return currentJwt && true
            default:
                return !currentJwt && true
        }
    }
    const path = () => {
        return routeType === "admin" ? "/login" : "/";
    }

    return (
        evaluatePass() ? <Outlet></Outlet> : <Navigate to={path()}></Navigate>
    )
}

ProtectedRoute.propTypes = {
    routeType: string
}
import {Navigate, Outlet} from "react-router-dom";
import {string} from "prop-types";
import Cookies from "js-cookie";

export default function ProtectedRoute({routeType}) {
    const jwt = Cookies.get("jwt_token")

    const evaluatePass = () => {
        switch (routeType) {
            case "admin":
                return jwt && true
            default:
                return !jwt && true
        }
    }
    const path = () => {
        return routeType === "admin" ? "/connection" : "/";
    }

    return (
        evaluatePass() ? <Outlet></Outlet> : <Navigate to={path()}></Navigate>
    )
}

ProtectedRoute.propTypes = {
    routeType: string
}
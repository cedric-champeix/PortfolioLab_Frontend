import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ProSidebarProvider} from "react-pro-sidebar";
import Dashboard from "./pages/admin/Dashboard.jsx";
import "./app.css";
import Portfolio from "./pages/admin/Portfolio.jsx";
import Resume from "./pages/admin/Resume.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {theme} from "./config/theme.js";
import {ThemeProvider} from "@mui/material/styles";
import Register from "./pages/auth/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {

    const {currentJwt} = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(currentJwt !== "");

    useEffect(() => {
        return () => {
            setIsLoggedIn(currentJwt !== "");
            console.log(currentJwt);
        };
    }, [isLoggedIn]);


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/register");
        }
    }, [isLoggedIn]);

    console.log(currentJwt);

    return (
        <ProSidebarProvider>
            <ThemeProvider theme={theme}>
                <main>
                    <Routes>
                        <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                            <Route path={'/'} element={<Dashboard/>}></Route>
                        </Route>
                        <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                            <Route path={'/resume'} element={<Resume/>}></Route>
                        </Route>
                        <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                            <Route path={'/portfolio'} element={<Portfolio/>}></Route>
                        </Route>

                        <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                            <Route path={'/register'} element={<Register/>}></Route>
                        </Route>

                    </Routes>
                </main>
            </ThemeProvider>
        </ProSidebarProvider>
    )
}
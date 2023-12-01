import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Dashboard from "./pages/admin/Dashboard/Dashboard.jsx";
import Portfolio from "./pages/admin/Portfolio.jsx";
import Resume from "./pages/admin/Resume/Resume.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {theme} from "./config/theme.js";
import {ThemeProvider} from "@mui/material/styles";
import Register from "./pages/auth/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/auth/Login.jsx";
import BoardElement from "./components/BoardElement.jsx";
import CssBaseline from "@mui/material/CssBaseline";

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


    return (
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <main>
                        <Routes>
                            <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                <Route path={'/'} element={<BoardElement elementName={"Dashboard"} element={<Dashboard/>}/>}></Route>
                            </Route>
                            <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                <Route path={'/resume'} element={<BoardElement elementName={"Resume"} element={<Resume/>}/>}></Route>
                            </Route>
                            <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                <Route path={'/portfolio'} element={<BoardElement elementName={"Portfolio"} element={<Portfolio/>}/>}></Route>
                            </Route>

                            <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                                <Route path={'/register'} element={<Register/>}></Route>
                            </Route>
                            <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                                <Route path={'/login'} element={<Login/>}></Route>
                            </Route>
                        </Routes>
                    </main>
                </CssBaseline>
            </ThemeProvider>
    )
}
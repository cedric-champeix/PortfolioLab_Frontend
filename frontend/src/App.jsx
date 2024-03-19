import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Resume from "./pages/Resume.jsx";
import {useAuth} from "./hooks/useAuth.js";
import {theme} from "./config/theme.js";
import {ThemeProvider} from "@mui/material/styles";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BoardElement from "./components/BoardElement.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Authenticate from "./pages/Authenticate.jsx";
import {NotificationServiceProvider} from "./context/NotificationService.jsx";
import Project from "./pages/Project.jsx";


export default function App() {

    const {currentJwt} = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(currentJwt !== "");

    useEffect(() => {
        return () => {
            setIsLoggedIn(currentJwt !== "");
        };
    }, [currentJwt, isLoggedIn]);


    return (
            <ThemeProvider theme={theme}>
                <NotificationServiceProvider>
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
                                <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                    <Route path={'/portfolio/:projectId'} element={<BoardElement elementName={"Project"} element={<Project/>}/>}/>
                                </Route>

                                <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                                    <Route path={'/register'} element={<Authenticate/>}></Route>
                                </Route>
                                <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                                    <Route path={'/registerold'} element={<Register/>}></Route>
                                </Route>
                            </Routes>
                        </main>
                    </CssBaseline>
                </NotificationServiceProvider>

            </ThemeProvider>
    )
}
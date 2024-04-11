import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Resume from "./pages/Resume.jsx";
import {useAuth} from "./hooks/useAuth.js";
import {theme} from "./config/theme.js";
import {ThemeProvider} from "@mui/material/styles";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BoardElement from "./components/BoardElement.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Authenticate from "./pages/Authenticate.jsx";
import {NotificationServiceProvider} from "./context/NotificationService.jsx";
import Project from "./pages/Project.jsx";
import Profile from "./pages/Profile.jsx";
import ViewResume from "./features/viewer/ViewResume.jsx";
import QuickActionProvider from "./context/QuickActionService.jsx";


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
                    <QuickActionProvider>
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
                                    <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                        <Route path={'/profile'} element={<BoardElement elementName={"Profile"} element={<Profile/>}/>}/>
                                    </Route>
                                    <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                        <Route path={'/preview'} element={<BoardElement elementName={"PreviewResume"} element={<ViewResume/>}/>}/>
                                    </Route>

                                    <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                                        <Route path={'/connection'} element={<Authenticate/>}></Route>
                                    </Route>

                                    <Route path={"/"} element={<ProtectedRoute routeType={"admin"}/>}>
                                        <Route path={'/previewResume'} element={<ViewResume></ViewResume>}></Route>
                                    </Route>
                                </Routes>
                            </main>
                        </CssBaseline>
                    </QuickActionProvider>
                </NotificationServiceProvider>
            </ThemeProvider>
    )
}
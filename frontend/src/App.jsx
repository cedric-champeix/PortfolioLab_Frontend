import CssBaseline from "@mui/material/CssBaseline";
import {Route, Routes} from "react-router-dom";
import {theme} from "./config/theme.js";
import {ThemeProvider} from "@mui/material/styles";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BoardElement from "./components/BoardElement.jsx";
import Authenticate from "./pages/Authenticate.jsx";
import {NotificationServiceProvider} from "./context/NotificationService.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Resume from "./pages/Resume.jsx";
import Project from "./pages/Project.jsx";
import Profile from "./pages/Profile.jsx";
import ViewerPortfolio from "./pages/viewer/ViewerPortfolio.jsx";
import ViewerProject from "./pages/viewer/ViewerProject.jsx";
import QuickActionProvider from "./context/QuickActionService.jsx";
import ViewerNavBar from "./features/viewer/ViewerNavBar.jsx";
import ViewerResume from "./pages/viewer/ViewerResume.jsx";


export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <NotificationServiceProvider>
                <QuickActionProvider>
                    <CssBaseline>
                        <main style={{height: "100vh", overflowY: "auto"}}>
                            <Routes>
                                <Route path={'/'} element={<ProtectedRoute routeType={"admin"}/>}>
                                    <Route path={'/'}
                                           element={<BoardElement elementName={"Portfolio"} element={<Portfolio/>}/>}/>
                                    <Route path={'/portfolio/:projectId'}
                                           element={<BoardElement elementName={"Project"} element={<Project/>}/>}/>

                                    <Route path={'/resume'}
                                           element={<BoardElement elementName={"Resume"} element={<Resume/>}/>}/>
                                    <Route path={'/resume/preview'} element={
                                        <BoardElement elementName={"Resume preview"}
                                                      element={<ViewerResume/>}/>
                                    }/>

                                    <Route path={'/profile'}
                                           element={<BoardElement elementName={"Profile"} element={<Profile/>}/>}/>
                                </Route>

                                <Route path={'/'} element={<ProtectedRoute routeType={"auth"}/>}>
                                    <Route path={'/connection'} element={<Authenticate/>}/>
                                </Route>

                                <Route path={"/viewer/:username"}>
                                    <Route path={"/viewer/:username"}
                                           element={<ViewerNavBar element={<ViewerPortfolio/>}/>}/>
                                    <Route path={"/viewer/:username/portfolio"}
                                           element={<ViewerNavBar element={<ViewerPortfolio/>}/>}/>
                                    <Route path={"/viewer/:username/portfolio/:projectId"}
                                           element={<ViewerNavBar element={<ViewerProject/>}/>}/>
                                    <Route path={"/viewer/:username/resume"}
                                           element={<ViewerNavBar element={<ViewerResume/>}/>}/>
                                </Route>
                            </Routes>
                        </main>
                    </CssBaseline>
                </QuickActionProvider>
            </NotificationServiceProvider>
        </ThemeProvider>
    )
}
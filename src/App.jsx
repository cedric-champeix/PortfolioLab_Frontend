import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Navbar from "./components/Sidebar.jsx";
import {ProSidebarProvider} from "react-pro-sidebar";
import Dashboard from "./pages/admin/Dashboard.jsx";
import "./app.css";
import Portfolio from "./pages/admin/Portfolio.jsx";
import Resume from "./pages/admin/Resume.jsx";
export default function App() {
    return (
        <BrowserRouter>
            <ProSidebarProvider>
                <main>
                    <Navbar></Navbar>
                    <Routes>
                        <Route path={'/'} element={<Dashboard/>}></Route>
                        <Route path={'/portfolio'} element={<Portfolio/>}></Route>
                        <Route path={'/resume'} element={<Resume/>}></Route>
                    </Routes>
                </main>
            </ProSidebarProvider>
        </BrowserRouter>
    )
}
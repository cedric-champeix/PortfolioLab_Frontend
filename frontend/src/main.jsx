import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

import {AuthProvider} from "./context/AuthContext.jsx";
import Cookies from "js-cookie";

//Modify to search into local storage in case of remember me checked
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjljMmIyYmExOGI2ZTQyYmI1MzRlMSIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3MDE0Mjk5NjMsImV4cCI6MTcwMTUxNjM2M30.c5F05awPkXCGqBBWP4wlvfQlVNyj3CCP5uBBJrjKabU";
console.log(token);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <AuthProvider token={token}>
                <BrowserRouter>
                    <App className="app"/>
                </BrowserRouter>
            </AuthProvider>
    </React.StrictMode>,
)

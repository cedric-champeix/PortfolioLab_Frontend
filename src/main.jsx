import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

import {AuthProvider} from "./context/AuthContext.jsx";

//Modify to search into local storage in case of remember me checked

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <AuthProvider token={""}>
                <BrowserRouter>
                    <App className="app"/>
                </BrowserRouter>
            </AuthProvider>
    </React.StrictMode>,
)

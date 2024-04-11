import {createContext, useCallback, useState} from "react";
import Notification from "./../components/Notification.jsx"

export const NotificationServiceContext  = createContext(null);

export const NotificationServiceProvider = ({children}) => {

    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("info")

    /**
     * Triggers the notification message
     * @param message   Message to trigger
     * @param severity  Alert severity : ["success", "info", "error", "warning"]
     */
    const notify = (message, severity) => {
        setMessage(message)
        setSeverity(severity)
        triggerAlert()
    }


    const triggerAlert  = useCallback(() => {
        setAlertOpen(true)
        setTimeout(() => {
            setAlertOpen(false)
            }
            ,2000)
    }, []);


    return <>
        <NotificationServiceContext.Provider value={notify}>
            {children}
        </NotificationServiceContext.Provider>
        <Notification open={alertOpen} message={message} severity={severity} ></Notification>
    </>
}

NotificationServiceProvider.propTypes = {
    children: () => {}
}
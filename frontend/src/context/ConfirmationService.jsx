import {createContext, useContext, useRef, useState} from "react";
import {Dialog} from "@mui/material";
import {RemoveSkillSafeguard} from "../pages/admin/Resume/RemoveSkillSafeguard.jsx";

//Implementation : https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe
const ConfirmationServiceContext = createContext(Promise.reject());

export const ConfirmationServiceContextProvider = ({children}) => {

    /*
    * Options :
    * - CatchOnCancel
    * - skillName
    */
    const [confirmationState, setConfirmationState] = useState(null);

    const awaitPromiseRef = useRef();

    const openConfirmation = (options)=> {
        setConfirmationState(options);
        return new Promise((resolve, reject) => {
            awaitPromiseRef.current = {resolve, reject};
        })
    }

    const handleClose = () => {
        if(confirmationState.catchOnCancel && awaitPromiseRef.current) {
            awaitPromiseRef.current.reject();
        }
        setConfirmationState(null);
    }

    const handleSubmit = () => {
        if(awaitPromiseRef.current) {
            awaitPromiseRef.current.resolve();
        }
        setConfirmationState(null);
    }

    return <>
        <ConfirmationServiceContext.Provider value={openConfirmation} children={children}/>
        <RemoveSkillSafeguard open={Boolean(confirmationState)} onSubmit={handleSubmit} onClose={handleClose} {...confirmationState}></RemoveSkillSafeguard>
    </>
}

export const useConfirmation = () => useContext(ConfirmationServiceContext);
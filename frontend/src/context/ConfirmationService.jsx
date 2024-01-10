import {createContext, useRef, useState} from "react";
import {RemoveSafeguard} from "../pages/admin/Resume/RemoveSafeguard.jsx";


//Implementation : https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe
/**
 * Confirmation service context
 * Quite complex so I will try to explain everything.
 * This service was originally created with Typescript, so there can be some warnings
 * First we create a confirmation context. It will store a ptomise (wrong initially)
 * @type {React.Context<Promise<never>>}
 */
export const ConfirmationServiceContext = createContext(Promise.reject());

/**
 * This is our provider for the context
 * @returns {JSX.Element}
 * @constructor
 */
export const ConfirmationServiceContextProvider = () => {

    /*
    * These are the options to pass to the dialog.
    * As of now it is only designed as a safeguard for skills and experiences removal, but
    * it can be easily adapted
    * Options :
    * - CatchOnCancel : specifies if we need to throw something in case of cacel
    * - name : name to display
    */
    const [confirmationState, setConfirmationState] = useState(null);

    //This is a reference that store a promise's resolve and reject functions
    const awaitPromiseRef = useRef();

    /**
     * Responsible for opening the dialog by passing options to the state
     *
     * @param options
     * @returns {Promise<unknown>}
     */
    const openConfirmation = (options)=> {
        //Adding the options to confirm
        setConfirmationState(options);
        return new Promise((resolve, reject) => {
            awaitPromiseRef.current = {resolve, reject};
        })
    }

    /**
     * Responsible for closing the dialog by setting the options to null
     */
    const handleClose = () => {
        if(confirmationState.catchOnCancel && awaitPromiseRef.current) {
            awaitPromiseRef.current.reject();
        }
        setConfirmationState(null);
    }

    /**
     * Responsible for submitting action.
     * Sets the options to null
     */
    const handleSubmit = () => {
        if(awaitPromiseRef.current) {
            awaitPromiseRef.current.resolve();
        }
        setConfirmationState(null);
    }

    return <>
        <ConfirmationServiceContext.Provider value={openConfirmation}></ConfirmationServiceContext.Provider>
        <RemoveSafeguard open={Boolean(confirmationState)} onSubmit={handleSubmit} onClose={handleClose} {...confirmationState}></RemoveSafeguard>
    </>
}


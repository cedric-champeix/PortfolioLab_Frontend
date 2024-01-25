import {useConfirmation} from "../../../hooks/useConfirmation.js";

/**
 * Handler for the remove safeguards
 * @param resourceId The resource id to be deleted
 * @param resourceName The name of the resource
 * @param deleteCallback The delete function to be performed
 */
export const removeSafeguard = (resourceId, resourceName, deleteCallback) => {

    //Calls the confirmation service
    //This hook will handle a promise and trigger a dialog to perform confirmation
    //Once confirmed by the user, the function executes the callback
    const confirm = useConfirmation()

    confirm({
        catchOnCancel: true,
        name: resourceName
    }).then(() => {
        deleteCallback(resourceId).then(() => {
            console.log("Item " + resourceName + " removed")
        })
    })



}
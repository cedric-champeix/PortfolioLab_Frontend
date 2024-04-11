import {createContext, useEffect, useReducer} from "react";

export const QuickActionContext = createContext(null);
/*
const defaultState =  {
    actions: [

    ]
}

const defaultAction = {
    type:"",
    actionName: ""
}*/

export default function QuickActionProvider({children}) {

    const quickActionReducer = (state, action) => {

        switch (action.type) {
            case "MOUNT_ACTION":
                return [...state, action.actionName];
            case "UNMOUNT_ACTION":
                return state.filter((item) => item !== action.actionName)
        }


    }



    const [quickActions, dispatch] = useReducer(quickActionReducer, [])

    useEffect(() => {
        console.log("Internal state", quickActions)

    }, [quickActions]);
    return <QuickActionContext.Provider value={{quickActions, dispatch}}>
        {children}
    </QuickActionContext.Provider>

}

QuickActionProvider.propTypes = {
    children: () => {
    }
}
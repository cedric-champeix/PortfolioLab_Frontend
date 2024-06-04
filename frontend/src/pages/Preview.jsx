import {useAuth} from "../hooks/useAuth.js";
import ViewResume from "../features/viewer/ViewResume.jsx";

export default function Dashboard() {

    const {userId, username} = useAuth()
    console.log(userId)
    console.log(username)

    return <>
        <ViewResume ></ViewResume>

    </>
}
Dashboard.componentName = "Dashboard";
import Draggable from "react-draggable"
import Paper from "@mui/material/Paper";

/**
 * Renders a sticky draggable paper
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function PaperComponent(props) {

    return <Draggable>
        <Paper {...props}></Paper>
    </Draggable>
}
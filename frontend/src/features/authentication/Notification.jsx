import {Alert, Snackbar} from "@mui/material";


export default function Notification({open, severity, message}) {

    return <>
        <Snackbar
            open={open}
            anchorOrigin={{vertical: "top", horizontal:"center"}}
            onClose={() => {}}
        >
            <Alert severity={severity} elevation={6}>{message}  </Alert>
        </Snackbar>
    </>
}
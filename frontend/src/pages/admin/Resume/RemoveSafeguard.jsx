import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

/*
* Props :
* - open : boolean -> is dialog opened
* - on submit
* - on close
* - name -> name
*/
export const RemoveSafeguard = ({open, onSubmit, onClose, name}) => {
    return  <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Do you want to remove {name} ?
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={onSubmit}>
                Delete
            </Button>
            <Button onClick={onClose} autoFocus>
                Close
            </Button>
        </DialogActions>
    </Dialog>
}
import PropTypes from "prop-types";
import React, {useState} from "react";
import {Box, Checkbox, DialogActions, DialogContent, FormControlLabel} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


export default function CreateSkill({create, toggle, callback}) {

    const [data, setData] = useState({name: "", description: "", isSoft: false})

    const handleSubmit = () => {
        create(data.name, data.description, data.isSoft, callback)
        toggle()
    }

    return <Box component="form">
        <DialogContent>
            <TextField
                autoFocus
                value={data.name}
                onChange={(e) => {
                    setData({
                        ...data,
                        name: e.target.value
                    })
                }}
                margin="dense"
                required
                id="name"
                label="Skill name"
                type="name"
                fullWidth
                variant="standard"
            />

            <TextField
                autoFocus
                value={data.description}
                onChange={(e) => {
                    setData({
                        ...data,
                        description: e.target.value
                    })
                }}
                margin="dense"
                id="description"
                label="Skill description"
                type="name"
                fullWidth
                multiline
                variant="standard"
            />

            <FormControlLabel control={
                <Checkbox onChange={() => setData({...data, isSoft: !data.isSoft})}
                          checked={data.isSoft}/>
            }
                              label="Soft Skill"/>
        </DialogContent>

        <DialogActions>
            <Button onClick={toggle} color="error">Close</Button>
            <Button disabled={!data.name} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Box>
}

CreateSkill.propTypes = {
    create: PropTypes.func,
    toggle: PropTypes.func,
    callback: PropTypes.func
}
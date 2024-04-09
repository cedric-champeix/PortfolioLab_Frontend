import {
    Chip, Menu, MenuItem, Tooltip
} from "@mui/material";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {useConfirmation} from "../../../hooks/useConfirmation.js";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SkillAction from "./SkillAction.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


export default function SkillChipEdit({skill, update, remove, selected}) {

    const [open, setOpen] = useState(false)


    const confirm = useConfirmation()

    const removeSafeguard = () => {
        confirm({
            catchOnCancel: true, name: skill.name
        }).then(() => {
            remove(skill.id)
        })
    }


    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return <div>
        <Tooltip title={skill.description} arrow>
            <Chip label={skill.name}
                  style={selected ? {border: "3px solid #1976d2", marginTop: "10px"} : {marginTop: "10px"}}
                  onDelete={handleMenuClick}
                  deleteIcon={
                      <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={menuOpen ? 'long-menu' : undefined}
                          aria-expanded={menuOpen ? 'true' : undefined}
                          aria-haspopup="true"
                          style={{
                              width: "25px",
                              height: "25px"
                          }}
                      >
                          <MoreVertIcon/>
                      </IconButton>
                  }
            />
        </Tooltip>
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => {
                handleMenuClose()
                setOpen(true)
            }}>
                <EditIcon/>
                Edit
            </MenuItem>
            <MenuItem onClick={() => {
                handleMenuClose()
                removeSafeguard()
            }}>
                <DeleteIcon/>
                Delete
            </MenuItem>
        </Menu>
        <SkillAction skill={skill} update={update} open={open} setOpen={setOpen}/>
    </div>

}

SkillChipEdit.propTypes = {
    skill: PropTypes.object,
    update:
    PropTypes.func,
    remove:
    PropTypes.func,
    selected:
    PropTypes.bool
}
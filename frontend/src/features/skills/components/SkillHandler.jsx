import PropTypes from "prop-types";
import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import {Dialog, Tab, Tabs} from "@mui/material";
import TabPanel from "../../../components/TabPanel.jsx";
import {useSkills} from "../hooks/useSkills.js";
import SelectSkill from "./SelectSkill.jsx";
import CreateSkill from "./CreateSkill.jsx";


export default function SkillHandler({open, toggle, callback}) {
    const [value, setValue] = useState(0)

    const {skills, create, update, remove} = useSkills()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Paper elevation={20}>
        <Dialog open={open}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab style={{width: "50%"}} label="Skills"/>

                <Tab style={{width: "50%"}} label="Create new skill"/>
            </Tabs>
            <TabPanel value={value} index={0} style={{overflow: "hidden"}}>
                <SelectSkill skills={skills} update={update} remove={remove} toggle={toggle} callback={callback}/>
            </TabPanel>
            <TabPanel value={value} index={1} style={{overflow: "hidden"}}>
                <CreateSkill create={create} toggle={toggle} callback={callback}/>
            </TabPanel>
        </Dialog>
    </Paper>
}

SkillHandler.propTypes = {
    open: PropTypes.bool,
    toggle: PropTypes.func,
    callback: PropTypes.func
}
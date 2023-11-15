import {Menu, MenuItem, Sidebar, useProSidebar} from "react-pro-sidebar";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {Link, useNavigate, useNavigation} from "react-router-dom";
import {HomeRounded, AssignmentRounded} from "@mui/icons-material";
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import FormatPaintRoundedIcon from '@mui/icons-material/FormatPaintRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
export default function MySidebar(props) {
    const {collapseSidebar} = useProSidebar();

    return <Sidebar style={{height: "100vh"}}>
        <Menu>
            <MenuItem icon={<MenuOutlinedIcon/>}
                onClick={() => {collapseSidebar()}}
            >
                    <h2>PortfolioLab</h2>
            </MenuItem>

            <MenuItem component={<Link to={"/"}/>} icon={<HomeRounded/>}
            >Dashboard</MenuItem>

            <MenuItem component={<Link to={"/portfolio"}/>} icon={<AssignmentRounded/>}
            >Portfolio</MenuItem>

            <MenuItem component={<Link to={"/resume"}/>} icon={<WorkRoundedIcon/>}
            >Resume</MenuItem>

            <MenuItem component={<Link to={""}/>} icon={<FormatPaintRoundedIcon/>}
            >Themes</MenuItem>

            <MenuItem component={<Link to={""}/>} icon={<ExtensionRoundedIcon/>}
            >Plugins</MenuItem>

            <MenuItem component={<Link to={""}/>} icon={<SettingsRoundedIcon/>}
            >Settings</MenuItem>

            <MenuItem component={<Link to={""}/>} icon={<LogoutRoundedIcon/>}
            >Log out</MenuItem>


        </Menu>
    </Sidebar>
}
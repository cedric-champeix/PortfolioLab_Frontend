import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "../config/theme.js"
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import {string} from "prop-types";
import {ConfirmationServiceContextProvider} from "../context/ConfirmationService.jsx";
import {useNotification} from "../hooks/useNotification.js";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded.js";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded.js";
import Person2Icon from "@mui/icons-material/Person2.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import {Avatar} from "@mui/material";

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function BoardElement({element, elementName}) {
    const [open, setOpen] = React.useState(true);
    //const {quickActions} = useQuickActions();

    const notify = useNotification();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const {username, logOut} = useAuth();


    useEffect(() => {
        if (localStorage.getItem("justAuthenticated") === "true") {
            notify("Just authenticated as " + username, "success")
            localStorage.setItem("justAuthenticated", 'false')
        }

    }, []);

    const navigate = useNavigate()
    const handleLogOut = (event) => {
        event.preventDefault();
        logOut()
        navigate("/connection");
    }

    return <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    {elementName}
                </Typography>
                <Box sx={{flexGrow: 0, display: "flex", alignItems: "center", gap: "10px"}}>
                    <Avatar alt={username.charAt(0).toUpperCase()} src=""/>
                    <Typography>{username}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
                <Link to="/">
                    <ListItemButton>
                        <ListItemIcon>
                            <LibraryBooksRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Portfolio"/>
                    </ListItemButton>
                </Link>

                <Link to="/resume">
                    <ListItemButton>
                        <ListItemIcon>
                            <BookmarkRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Resume"/>
                    </ListItemButton>
                </Link>

                <Link to="/profile">
                    <ListItemButton>
                        <ListItemIcon>
                            <Person2Icon/>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItemButton>
                </Link>


                <Link to={`/viewer/${username}/`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <VisibilityIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Preview"/>
                    </ListItemButton>
                </Link>

                <Divider sx={{my: 1}}/>

                <ListItemButton onClick={(ev) => handleLogOut(ev)}>
                    <ListItemIcon>
                        <LogoutRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Log out"/>
                </ListItemButton>
            </List>
        </Drawer>
        <ConfirmationServiceContextProvider>
            {element}
        </ConfirmationServiceContextProvider>
    </Box>
}

BoardElement.propTypes = {
    element: () => {
    },
    elementName: string
}
BoardElement.defaultProps = {
    element: () => {
    },
};

/*

* */
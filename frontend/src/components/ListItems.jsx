import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import {Link} from "react-router-dom";

export const mainListItems = (
    <React.Fragment>
        <Link to="/">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
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

        <Link to="/portfolio">
            <ListItemButton>
                <ListItemIcon>
                    <LibraryBooksRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Portfolio"/>
            </ListItemButton>
        </Link>

    </React.Fragment>
);

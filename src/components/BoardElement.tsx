import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { MouseEvent, ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../config/theme.ts';
import { ConfirmationServiceContextProvider } from '../context/ConfirmationService.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { useNotification } from '../hooks/useNotification.ts';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  // @ts-ignore
})(({ theme, open }) => ({
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

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface BoardElementProps {
  element: ReactNode;
  elementName: string;
}

export const BoardElement: React.FunctionComponent<
  Readonly<BoardElementProps>
> = ({ element, elementName }) => {
  const [open, setOpen] = React.useState(true);

  const { notify } = useNotification();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { username, logOut } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('justAuthenticated') === 'true') {
      notify('Just authenticated as ' + username, 'success');
      localStorage.setItem('justAuthenticated', 'false');
    }
  }, []);

  const navigate = useNavigate();
  const handleLogOut = (event: MouseEvent<any>) => {
    event.preventDefault();
    logOut();
    navigate('/connection');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* @ts-ignore */}
      <AppBar position="fixed" open={open}>
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
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {elementName}
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar alt={username.charAt(0).toUpperCase()} src="" />
            <Typography>{username}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{ height: '100vh' }}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav">
          <Link to="/">
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItemButton>
          </Link>

          <Link to="/resume">
            <ListItemButton>
              <ListItemIcon>
                <BookmarkRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Resume" />
            </ListItemButton>
          </Link>

          <Link to="/profile">
            <ListItemButton>
              <ListItemIcon>
                <Person2Icon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </Link>

          <Link to={`/viewer/${username}/`} target="_blank">
            <ListItemButton>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Preview" />
            </ListItemButton>
          </Link>

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={handleLogOut}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Drawer>
      <ConfirmationServiceContextProvider>
        <Box component="div" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
          <DrawerHeader />
          {element}
        </Box>
      </ConfirmationServiceContextProvider>
    </Box>
  );
};

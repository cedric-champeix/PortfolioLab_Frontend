import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { MouseEvent, ReactNode, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../../pages/error/404.tsx';

interface Props {
  children: ReactNode;
}

export const ViewerNavBar: React.FunctionComponent<Props> = ({ children }) => {
  const { username } = useParams();

  const pages = {
    Portfolio: `/viewer/${username}/portfolio`,
    Resume: `/viewer/${username}/resume`,
  };

  const [anchorElNav, setAnchorElNav] = useState<Element | null>(null);

  const handleOpenNavMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (!username) {
    return <NotFoundPage />;
  }

  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PortfolioLab
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {Object.entries(pages).map(([name, path]) => (
                  <Link to={path} key={name}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {Object.entries(pages).map(([name, path]) => (
                <Link to={path} key={name}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      mx: 2,
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    {name}
                  </Button>
                </Link>
              ))}
            </Box>

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
        </Container>
      </AppBar>
      <Toolbar />
      <Box>{children}</Box>
    </>
  );
};

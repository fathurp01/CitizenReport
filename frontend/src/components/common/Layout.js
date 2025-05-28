import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const items = [
      { text: 'Home', icon: <HomeIcon />, path: '/' }
    ];

    if (!user) {
      items.push(
        { text: 'Login', icon: <LogoutIcon />, path: '/login' }
      );
    } else {
      if (user.role === 'citizen') {
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/citizen/dashboard' },
          { text: 'Create Report', icon: <ReportIcon />, path: '/citizen/create-report' }
        );
      } else if (user.role === 'village_staff') {
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/staff/dashboard' }
        );
      } else if (user.role === 'admin') {
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' }
        );
      }
      
      items.push({ text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout });
    }

    return items;
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {getMenuItems().map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={item.onClick || (() => handleNavigation(item.path))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Citizen Report
          </Typography>
          {!isMobile && (
            <Box>
              {!user ? (
                <>
                  <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                  <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
      
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>
      
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Citizen Report. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
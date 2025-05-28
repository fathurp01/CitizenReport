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
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Citizen Report
        </Typography>
      </Box>
      <List sx={{ py: 2 }}>
        {getMenuItems().map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={item.onClick || (() => handleNavigation(item.path))}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'primary.light',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
                '& .MuiListItemText-primary': {
                  color: 'primary.main',
                  fontWeight: 600,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ fontSize: '0.95rem' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: 'white', 
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ReportIcon sx={{ mr: 1 }} /> Citizen Report
          </Typography>
          {!isMobile && (
            <Box>
              {!user ? (
                <>
                  <Button 
                    color="primary" 
                    onClick={() => navigate('/')}
                    sx={{ mr: 1 }}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    color="primary" 
                    onClick={() => navigate('/')}
                    sx={{ mr: 1 }}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
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
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '0 16px 16px 0',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
          <ReportIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Citizen Report
          </Typography>
        </Box>
        {drawer}
      </Drawer>
      
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'background.paper', 
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
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
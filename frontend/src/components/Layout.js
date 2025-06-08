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
  Divider,
  Container,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../context/AuthContext';
import { Person } from '@mui/icons-material';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleEditProfile = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  const getMenuItems = () => {
    const baseItems = [];
    
    if (user?.role === 'admin') {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'Kelola Pengguna', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Kelola Artikel', icon: <ArticleIcon />, path: '/admin/articles' },
        ...baseItems
      ];
    } else if (user?.role === 'village_staff') {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/staff/dashboard' },
        { text: 'Kelola Artikel', icon: <ArticleIcon />, path: '/staff/articles' },
        ...baseItems
      ];
    } else {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/citizen/dashboard' },
        { text: 'Buat Laporan', icon: <AddIcon />, path: '/citizen/create-report' },
        { text: 'Artikel', icon: <ArticleIcon />, path: '/citizen/articles' },
        ...baseItems
      ];
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          CitizenReport
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.fullName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.role === 'village_staff' ? 'Village Staff' : user?.role === 'admin' ? 'Administrator' : 'Citizen'}
        </Typography>
      </Box>
      <Divider />
      <List>
        {getMenuItems().map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation('/profile')}>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 0,
          mb: 0,
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ 
              mr: 2,
              '&:hover': {
                transform: 'rotate(180deg)',
                transition: 'transform 0.3s ease-in-out'
              } 
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            CitizenReport
          </Typography>
          
          {/* Profile Dropdown Button */}
          <Button 
            color="inherit" 
            onClick={handleProfileMenuOpen}
            startIcon={
              <Avatar 
                sx={{ width: 32, height: 32 }}
                src={user?.profilePicture}
              >
                {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </Avatar>
            }
            endIcon={<ArrowDropDownIcon />}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              },
              textTransform: 'none',
              borderRadius: '20px',
              px: 2
            }}
          >
            Profile
          </Button>
          
          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                minWidth: '180px'
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem 
              onClick={handleEditProfile}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.08)'
                }
              }}
            >
              <EditIcon sx={{ mr: 2, fontSize: 20 }} />
              Edit Profile
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'rgba(244, 67, 54, 0.08)'
                }
              }}
            >
              <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderRadius: '0 16px 16px 0',
            boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        {drawer}
      </Drawer>
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'background.paper', 
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} CitizenReport. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
            Dibuat dengan ❤️ untuk masyarakat
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
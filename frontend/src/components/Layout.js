import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  // Button, 
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
  Avatar,
  Chip,
  // Badge,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../context/AuthContext';

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
    const basePath = user?.role === 'admin' ? '/admin' : 
                    user?.role === 'village_staff' ? '/staff' : '/citizen';
    navigate(`${basePath}/profile`);
    handleProfileMenuClose();
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const getMenuItems = () => {
    const commonProfileItem = { text: 'Profil Saya', icon: <PersonIcon />, action: handleEditProfile };
    
    if (user.role === 'admin') {
      return [
        { text: 'Beranda', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'Kelola Pengguna', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Kelola Artikel', icon: <ArticleIcon />, path: '/admin/articles' },
        commonProfileItem
      ];
    } else if (user.role === 'village_staff') {
      return [
        { text: 'Beranda', icon: <DashboardIcon />, path: '/staff/dashboard' },
        { text: 'Artikel', icon: <ArticleIcon />, path: '/staff/articles' },
        commonProfileItem
      ];
    } else {
      return [
        { text: 'Beranda', icon: <DashboardIcon />, path: '/citizen/dashboard' },
        { text: 'Buat Laporan', icon: <ReportIcon />, path: '/citizen/create-report' },
        { text: 'Artikel', icon: <ArticleIcon />, path: '/citizen/articles' },
        commonProfileItem
      ];
    }
  };

  const getRoleDisplayName = () => {
    switch(user?.role) {
      case 'village_staff': return 'Pegawai Desa';
      case 'admin': return 'Administrator';
      default: return 'Warga';
    }
  };

  // const getRoleColor = () => {
  //   switch(user?.role) {
  //     case 'admin': return '#ff5722';
  //     case 'village_staff': return '#2196f3';
  //     default: return '#4caf50';
  //   }
  // };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      handleNavigation(item.path);
    }
  };

  const drawer = (
    <Box
      sx={{ 
        width: 280,
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        height: '100%'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* User Profile Section */}
      <Box 
        sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Cpath d="m0 40l40-40h-40v40zm0-40l40 40v-40h-40z"/%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleEditProfile();
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 48, 
                height: 48, 
                mr: 2,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  lineHeight: 1.2
                }}
              >
                CitizenReport
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: '0.75rem'
                }}
              >
                Digital Governance Platform
              </Typography>
            </Box>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500,
              mb: 0.5,
              fontSize: '0.95rem'
            }}
          >
            {user?.fullName}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              label={getRoleDisplayName()}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 500,
                fontSize: '0.7rem',
                height: 24,
                '& .MuiChip-label': {
                  px: 1.5
                }
              }}
            />
            <PersonIcon sx={{ fontSize: '1.2rem', opacity: 0.7 }} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />
      
      {/* Navigation Menu */}
      <List sx={{ pt: 2, px: 1 }}>
        {getMenuItems().map((item, index) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleMenuItemClick(item)}
            sx={{
              mb: 0.5,
              borderRadius: 2,
              mx: 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(102, 126, 234, 0.08)',
                transform: 'translateX(4px)',
                '& .MuiListItemIcon-root': {
                  color: '#667eea'
                },
                '& .MuiListItemText-primary': {
                  color: '#667eea',
                  fontWeight: 600
                }
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40,
                transition: 'color 0.2s ease-in-out'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out'
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />
      
      {/* Logout Section */}
      <List sx={{ px: 1, pb: 2 }}>
        <ListItem 
          button 
          onClick={logout}
          sx={{
            borderRadius: 2,
            mx: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'rgba(244, 67, 54, 0.08)',
              transform: 'translateX(4px)',
              '& .MuiListItemIcon-root': {
                color: '#f44336'
              },
              '& .MuiListItemText-primary': {
                color: '#f44336',
                fontWeight: 600
              }
            }
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: 40,
              transition: 'color 0.2s ease-in-out'
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Keluar"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out'
            }}
          />
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
          backdropFilter: 'blur(10px)',
          borderRadius: { xs: 0, sm: '0 0 24px 24px' },
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Toolbar sx={{ position: 'relative', zIndex: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ 
              mr: 2,
              p: 1.5,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'rotate(90deg) scale(1.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              } 
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              CitizenReport
            </Typography>
            
            <Chip
              label={getRoleDisplayName()}
              size="small"
              sx={{
                ml: 2,
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: { xs: 'none', sm: 'flex' }
              }}
            />
          </Box>
          
          {/* User Avatar & Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0.5,
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                {user?.fullName?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEditProfile} sx={{ py: 1.5, px: 2 }}>
          <PersonIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
          Edit Profil
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout} sx={{ py: 1.5, px: 2, color: 'error.main' }}>
          <LogoutIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
          Keluar
        </MenuItem>
      </Menu>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderRadius: '0 24px 24px 0',
            boxShadow: '8px 0 32px rgba(0, 0, 0, 0.12)',
            border: 'none',
            overflow: 'hidden'
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
          py: 4, 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgb(102, 126, 234)" fill-opacity="0.03"%3E%3Cpath d="m0 40l40-40h-40v40zm0-40l40 40v-40h-40z"/%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ 
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            © {new Date().getFullYear()} CitizenReport. All rights reserved.
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center" 
            display="block" 
            sx={{ 
              mt: 1,
              fontSize: '0.8rem',
              opacity: 0.8
            }}
          >
            Dibuat dengan ❤️ untuk masyarakat
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
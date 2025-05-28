import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  Avatar,
  Chip,
  Badge,
  Tooltip,
  Paper,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../context/AuthContext';

// Styled Components untuk design yang lebih modern
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: 0,
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
  }
}));

const StyledDrawer = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)',
  borderRadius: '0 24px 24px 0',
  border: 'none',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden'
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: '12px',
  margin: '4px 12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
  color: active ? 'white' : theme.palette.text.primary,
  '&:hover': {
    background: active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(102, 126, 234, 0.08)',
    transform: 'translateX(8px)',
    boxShadow: active 
      ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
      : '0 4px 15px rgba(102, 126, 234, 0.1)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? 'white' : theme.palette.primary.main,
    minWidth: '40px',
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiListItemIcon-root': {
    transform: 'scale(1.1)',
  },
  '& .MuiListItemText-primary': {
    fontWeight: active ? 600 : 500,
    fontSize: '0.95rem',
  }
}));

const UserProfile = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20px',
    background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 100%)',
  }
}));

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  const getMenuItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: `/${user.role === 'admin' ? 'admin' : user.role === 'village_staff' ? 'staff' : 'citizen'}/dashboard` }
    ];

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' }
      ];
    } else if (user.role === 'village_staff') {
      return [
        ...baseItems,
        { text: 'All Reports', icon: <ReportIcon />, path: '/staff/reports' }
      ];
    } else {
      return [
        ...baseItems,
        { 
          text: 'My Reports', 
          icon: <ReportIcon />, 
          path: '/citizen/reports',
          hasSubmenu: true,
          submenu: [
            { text: 'View Reports', icon: <ReportIcon />, path: '/citizen/dashboard' },
            { text: 'Create Report', icon: <AddIcon />, path: '/citizen/create-report' }
          ]
        }
      ];
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'village_staff': return 'Village Staff';
      case 'admin': return 'Administrator';
      default: return 'Citizen';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'village_staff': return 'warning';
      case 'admin': return 'error';
      default: return 'primary';
    }
  };

  const drawer = (
    <StyledDrawer sx={{ width: 280, height: '100%' }}>
      <UserProfile>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 2,
            border: '3px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {user?.fullName || 'User'}
        </Typography>
        <Chip 
          label={getRoleDisplayName(user?.role)} 
          size="small"
          sx={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 500,
            backdropFilter: 'blur(10px)'
          }}
        />
      </UserProfile>

      <List sx={{ py: 2, px: 1 }}>
        {getMenuItems().map((item) => (
          <React.Fragment key={item.text}>
            <StyledListItem 
              button 
              active={isActivePath(item.path)}
              onClick={() => {
                if (item.hasSubmenu) {
                  setReportsOpen(!reportsOpen);
                } else {
                  handleNavigation(item.path);
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.hasSubmenu && (reportsOpen ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItem>
            
            {item.hasSubmenu && (
              <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <StyledListItem
                      key={subItem.text}
                      button
                      active={isActivePath(subItem.path)}
                      onClick={() => handleNavigation(subItem.path)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2, opacity: 0.3 }} />
        <StyledListItem button onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledListItem>
      </Box>
    </StyledDrawer>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8faff' }}>
      <StyledAppBar position="sticky" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ 
              mr: 2,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255,255,255,0.2)',
                transform: 'rotate(90deg)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              } 
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <HomeIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(45deg, #ffffff 30%, rgba(255,255,255,0.8) 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CitizenReport
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit"
                sx={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { background: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Button 
              color="inherit" 
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                ml: 1,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                }
              }}
            >
              {!isMobile && 'Logout'}
            </Button>
          </Box>
        </Toolbar>
      </StyledAppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            border: 'none',
            background: 'transparent'
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            backdropFilter: 'blur(8px)'
          }
        }}
      >
        {drawer}
      </Drawer>

      <Container 
        component="main" 
        maxWidth="xl" 
        sx={{ 
          flexGrow: 1, 
          py: 4,
          px: { xs: 2, sm: 3 }
        }}
      >
        <Box 
          sx={{
            minHeight: '70vh',
            animation: 'fadeIn 0.6s ease-out'
          }}
        >
          <Outlet />
        </Box>
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
          mt: 'auto',
          borderTop: '1px solid rgba(102, 126, 234, 0.1)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              CitizenReport
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} CitizenReport. All rights reserved.
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                mt: 1,
                opacity: 0.8
              }}
            >
              Dibuat dengan ❤️ untuk masyarakat Indonesia
            </Typography>
          </Box>
        </Container>
      </Box>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Layout;
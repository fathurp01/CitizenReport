import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  Slide,
  Zoom,
  Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import { keyframes } from '@mui/system';

// Enhanced Animations (removed unused slideInUp)
const pulse = keyframes`
  0% { transform: scale(1) rotate(0deg); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { transform: scale(1.08) rotate(180deg); box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
  100% { transform: scale(1) rotate(360deg); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await login(email, password);

      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.user.role === 'village_staff') {
        navigate('/staff/dashboard');
      } else {
        navigate('/citizen/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)',
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 15s ease infinite`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 0%, transparent 30%)
          `,
          zIndex: 1
        }
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center',
          py: 2 // Add padding for mobile
        }}
      >
        <Zoom in={isVisible} timeout={1000}>
          <Card 
            elevation={0}
            sx={{ 
              width: '100%',
              maxHeight: '95vh',
              borderRadius: '28px', 
              overflow: 'hidden',
              position: 'relative',
              backdropFilter: 'blur(25px) saturate(200%)',
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.12),
                0 32px 64px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.6)
              `,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.01)',
                boxShadow: `
                  0 16px 48px rgba(0, 0, 0, 0.15),
                  0 48px 80px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8)
                `
              }
            }}
          >
            {/* Compact Header Section */}
            <Slide direction="down" in={isVisible} timeout={1200}>
              <Box sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                color: 'white',
                py: 3,
                px: 4,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0, // Prevent header from shrinking
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  zIndex: 1
                }
              }}>
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <SecurityIcon sx={{ 
                    fontSize: 48, 
                    mb: 1,
                    animation: `${pulse} 4s infinite`,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    p: 1.5
                  }} />
                  <Typography variant="h4" component="h1" sx={{ 
                    fontWeight: 800, 
                    mb: 0.5,
                    fontSize: '1.8rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #ffffff, #f3e8ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text'
                  }}>
                    Selamat Datang
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    opacity: 0.95,
                    fontSize: '0.95rem',
                    fontWeight: 500
                  }}>
                    Masuk ke akun CitizenReport Anda
                  </Typography>
                </Box>
              </Box>
            </Slide>

            {/* Scrollable Content Area */}
            <Box sx={{ 
              flex: 1, 
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ 
                px: 4, 
                py: 3, 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0 // Important for proper scrolling
              }}>
                {/* Compact Back Button */}
                <Fade in={formVisible} timeout={600}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    size="small"
                    sx={{ 
                      mb: 2, 
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      borderRadius: '12px',
                      alignSelf: 'flex-start',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateX(-4px)',
                        color: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.08)'
                      }
                    }}
                  >
                    Kembali ke Beranda
                  </Button>
                </Fade>

                {/* Compact Error Alert */}
                {error && (
                  <Grow in={!!error} timeout={500}>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 2, 
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        py: 0.5
                      }}
                    >
                      {error}
                    </Alert>
                  </Grow>
                )}

                {/* Login Form with proper spacing */}
                <Fade in={formVisible} timeout={1000}>
                  <Box 
                    component="form" 
                    onSubmit={handleSubmit} 
                    noValidate
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      flex: 1
                    }}
                  >
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Alamat Email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: '#6366f1', fontSize: 22 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '14px',
                          fontSize: '1rem',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '& fieldset': {
                            borderColor: 'rgba(99, 102, 241, 0.25)',
                            borderWidth: '2px',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(99, 102, 241, 0.5)',
                            transform: 'scale(1.005)'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#6366f1',
                            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.12)'
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#6366f1'
                        }
                      }}
                    />
                    
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Kata Sandi"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: '#6366f1', fontSize: 22 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                              sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  color: '#6366f1',
                                  transform: 'scale(1.1)'
                                }                              
                              }}>
                              {showPassword ? 
                                <VisibilityOffIcon sx={{ fontSize: 22 }} /> : 
                                <VisibilityIcon sx={{ fontSize: 22 }} />
                              }
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '14px',
                          fontSize: '1rem',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '& fieldset': {
                            borderColor: 'rgba(99, 102, 241, 0.25)',
                            borderWidth: '2px',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(99, 102, 241, 0.5)',
                            transform: 'scale(1.005)'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#6366f1',
                            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.12)'
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#6366f1'
                        }
                      }}
                    />
                    
                    {/* Enhanced Login Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      startIcon={loading ? null : <LoginIcon />}
                      sx={{
                        py: 1.8,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '14px',
                        position: 'relative',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                        backgroundSize: '200% 200%',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)',
                        overflow: 'hidden',
                        textTransform: 'none',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          transition: 'all 0.7s ease',
                          zIndex: 1
                        },
                        '&:hover': {
                          transform: 'translateY(-2px) scale(1.02)',
                          boxShadow: '0 16px 48px rgba(99, 102, 241, 0.45)',
                          backgroundPosition: 'right center'
                        },
                        '&:hover::before': {
                          left: '100%'
                        },
                        '&:active': {
                          transform: 'translateY(0) scale(0.98)'
                        },
                        '&:disabled': {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                          opacity: 0.7
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                      ) : null}
                      {loading ? 'Memproses...' : 'Masuk ke Akun'}
                    </Button>

                    {/* Compact Divider */}
                    <Divider sx={{ 
                      my: 1,
                      '&::before, &::after': {
                        borderColor: 'rgba(99, 102, 241, 0.2)'
                      }
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{
                        px: 2,
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}>
                        Belum punya akun?
                      </Typography>
                    </Divider>

                    {/* Enhanced Register Button - Now properly positioned */}
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate('/register')}
                      startIcon={<PersonAddIcon />}
                      sx={{ 
                        py: 1.8,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '14px',
                        borderWidth: '2px',
                        borderColor: 'rgba(99, 102, 241, 0.4)',
                        color: '#6366f1',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        textTransform: 'none',
                        marginBottom: 2, // Add bottom margin for safety
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                          transform: 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: -1
                        },
                        '&:hover': { 
                          borderColor: '#6366f1',
                          transform: 'translateY(-1px) scale(1.01)',
                          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.25)'
                        },
                        '&:hover::before': {
                          transform: 'scaleX(1)'
                        },
                        '&:active': {
                          transform: 'translateY(0) scale(0.98)'
                        }
                      }}
                    >
                      Daftar Akun Baru
                    </Button>
                  </Box>
                </Fade>
              </CardContent>
            </Box>
          </Card>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Login;
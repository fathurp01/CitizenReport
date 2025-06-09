import React, { useState } from 'react';
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
  Paper
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Card 
          elevation={10} 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden',
            animation: 'fadeIn 0.5s ease-in-out',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-3px',
              background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea, #764ba2)',
              backgroundSize: '400% 400%',
              zIndex: -1,
              borderRadius: '23px',
              opacity: 1,
              animation: 'gradientBorder 3s linear infinite'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'white',
              borderRadius: '20px',
              zIndex: -1
            },
            '@keyframes gradientBorder': {
              '0%': {
                backgroundPosition: '0% 50%'
              },
              '50%': {
                backgroundPosition: '100% 50%'
              },
              '100%': {
                backgroundPosition: '0% 50%'
              }
            }
          }}
        >
          <Box sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              zIndex: 1
            }
          }}>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              position: 'relative',
              zIndex: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Selamat Datang
            </Typography>
            <Typography variant="body1" sx={{ 
              opacity: 0.9,
              position: 'relative',
              zIndex: 2 
            }}>
              Masuk ke akun CitizenReport Anda
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ 
                mb: 3, 
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-4px)',
                  color: 'primary.main'
                }
              }}
            >
              Kembali
            </Button>

            {error && (
              <Alert severity="error" sx={{ 
                mb: 3, 
                borderRadius: 2,
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: '2px',
                    },
                  },
                }}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: '2px',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? null : <LoginIcon />}
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  position: 'relative',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(118, 75, 162, 0.3)',
                  overflow: 'hidden',
                  zIndex: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(118, 75, 162, 0), rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0))',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '50% 0',
                    transition: 'all 0.4s ease',
                    opacity: 0,
                    zIndex: -1
                  },
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(118, 75, 162, 0.4)'
                  },
                  '&:hover::before': {
                    opacity: 1,
                    backgroundPosition: '0% 0'
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Masuk'}
              </Button>

              <Divider sx={{ 
                my: 3,
                '&::before, &::after': {
                  borderColor: 'rgba(118, 75, 162, 0.2)',
                }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{
                  px: 1,
                  fontWeight: 500
                }}>
                  Belum punya akun?
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => navigate('/register')}
                startIcon={<PersonAddIcon />}
                sx={{ 
                  mt: 1, 
                  py: 1.5,
                  borderWidth: '2px',
                  borderColor: 'rgba(102, 126, 234, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(118, 75, 162, 0), rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0))',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '50% 0',
                    transition: 'all 0.4s ease',
                    opacity: 0,
                    zIndex: -1
                  },
                  '&:hover': { 
                    borderColor: '#667eea',
                  },
                  '&:hover::before': {
                    opacity: 1,
                    backgroundPosition: '0% 0'
                  }
                }}
              >
                Daftar Sekarang
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;

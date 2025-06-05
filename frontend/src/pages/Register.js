import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Alert,
  Link as MuiLink,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    rt: '',
    rw: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Tambahan sementara untuk menghindari ReferenceError
  const errors = {};

  const { fullName, email, password, confirmPassword, phoneNumber, address, rt, rw } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validasi dasar
    if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !address || !rt || !rw) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setFormError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
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
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
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
              opacity: 1, // Selalu terlihat
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
              Daftar Akun
            </Typography>
            <Typography variant="body1" sx={{ 
              opacity: 0.9,
              position: 'relative',
              zIndex: 2 
            }}>
              Buat akun CitizenReport baru
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
              Kembali ke Beranda
            </Button>

            {formError && (
              <Alert severity="error" sx={{ 
                mb: 3, 
                borderRadius: 2,
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                {formError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="fullName"
                    label="Nama Lengkap"
                    name="fullName"
                    value={fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Alamat Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Konfirmasi Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Nomor Telepon"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Alamat"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="rt"
                    label="RT"
                    name="rt"
                    value={rt}
                    onChange={handleChange}
                    error={!!errors.rt}
                    helperText={errors.rt}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="rw"
                    label="RW"
                    name="rw"
                    value={rw}
                    onChange={handleChange}
                    error={!!errors.rw}
                    helperText={errors.rw}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
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
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? null : <HowToRegIcon />}
                sx={{
                  mt: 4,
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
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Daftar'}
              </Button>

              <Divider sx={{ 
                my: 2,
                '&::before, &::after': {
                  borderColor: 'rgba(118, 75, 162, 0.2)',
                }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{
                  px: 1,
                  fontWeight: 500
                }}>
                  Sudah punya akun?
                </Typography>
              </Divider>

              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <MuiLink 
                  component={RouterLink} 
                  to="/login" 
                  variant="body2"
                  sx={{
                    color: '#667eea',
                    fontWeight: 'medium',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'right',
                      transition: 'transform 0.3s ease'
                    },
                    '&:hover': {
                      color: '#764ba2'
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'left'
                    }
                  }}
                >
                  Masuk ke akun yang sudah ada
                </MuiLink>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;

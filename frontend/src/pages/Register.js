import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Slide,
  Zoom,
  Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SecurityIcon from '@mui/icons-material/Security';
import { keyframes } from '@mui/system';

// Enhanced Animations (consistent with Login.js)
const pulse = keyframes`
  0% { transform: scale(1) rotate(0deg); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { transform: scale(1.08) rotate(180deg); box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
  100% { transform: scale(1) rotate(360deg); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

const slideInUp = keyframes`
  0% { transform: translateY(40px) scale(0.95); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    rt: '',
    rw: '',
    gender: '',
    birthDate: '',
    occupation: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
        width: '100vw',
        overflow: 'auto',
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)',
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 15s ease infinite`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        py: 3,
        px: 2,
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
      <Container maxWidth="sm" sx={{ 
        position: 'relative', 
        zIndex: 2,
        width: '100%',
        my: 2
      }}>
        <Zoom in={isVisible} timeout={1000}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: '24px', 
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
              '&:hover': {
                transform: 'translateY(-2px) scale(1.005)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.15),
                  0 40px 72px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8)
                `
              }
            }}
          >
            {/* Header Section */}
            <Slide direction="down" in={isVisible} timeout={1200}>
              <Box sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                color: 'white',
                py: 2,
                px: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
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
                    fontSize: 40, 
                    mb: 1,
                    animation: `${pulse} 3s ease-in-out infinite`,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }} />
                  <Typography variant="h5" component="h1" sx={{
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    letterSpacing: '0.5px'
                  }}>
                    Daftar Akun Baru
                  </Typography>
                  <Typography variant="body2" sx={{
                    mt: 0.5,
                    opacity: 0.9,
                    fontSize: '0.9rem'
                  }}>
                    Bergabunglah dengan komunitas pelaporan warga
                  </Typography>
                </Box>
              </Box>
            </Slide>

            <CardContent sx={{ p: 3 }}>
              {/* Back Button */}
              <Fade in={formVisible} timeout={800}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/')}
                  sx={{
                    mb: 2,
                    color: '#6366f1',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      transform: 'translateX(-4px)'
                    }
                  }}
                >
                  Kembali ke Beranda
                </Button>
              </Fade>

              {/* Error Alert */}
              {formError && (
                <Grow in={!!formError} timeout={500}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 2,
                      borderRadius: '12px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {formError}
                  </Alert>
                </Grow>
              )}

              {/* Registration Form */}
              <Fade in={formVisible} timeout={1000}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="fullName"
                        label="Nama Lengkap"
                        id="fullName"
                        value={fullName}
                        onChange={handleChange}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Nomor Telepon"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="address"
                        label="Alamat Lengkap"
                        id="address"
                        value={address}
                        onChange={handleChange}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        name="rt"
                        label="RT"
                        id="rt"
                        value={rt}
                        onChange={handleChange}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        name="rw"
                        label="RW"
                        id="rw"
                        value={rw}
                        onChange={handleChange}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        label="Jenis Kelamin"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '& fieldset': {
                              borderColor: 'rgba(99, 102, 241, 0.25)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(99, 102, 241, 0.5)',
                              transform: 'scale(1.005)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#6366f1',
                              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.12)',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#6366f1',
                          },
                        }}
                      >
                        <MenuItem value=""><em>Pilih</em></MenuItem>
                        <MenuItem value="male">Laki-laki</MenuItem>
                        <MenuItem value="female">Perempuan</MenuItem>
                      </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="birthDate"
                        label="Tanggal Lahir"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '& fieldset': {
                              borderColor: 'rgba(99, 102, 241, 0.25)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(99, 102, 241, 0.5)',
                              transform: 'scale(1.005)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#6366f1',
                              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.12)',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#6366f1',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="occupation"
                        label="Pekerjaan"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '& fieldset': {
                              borderColor: 'rgba(99, 102, 241, 0.25)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(99, 102, 241, 0.5)',
                              transform: 'scale(1.005)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#6366f1',
                              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.12)',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#6366f1',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? null : <HowToRegIcon />}
                    sx={{
                      mt: 2,
                      mb: 1.5,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
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
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    ) : null}
                    {isSubmitting ? 'Mendaftar...' : 'Daftar Akun'}
                  </Button>

                  {/* Divider */}
                  <Divider sx={{ 
                    my: 1.5,
                    '&::before, &::after': {
                      borderColor: 'rgba(99, 102, 241, 0.2)'
                    }
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{
                      px: 2,
                      fontWeight: 500,
                      fontSize: '0.85rem'
                    }}>
                      Sudah punya akun?
                    </Typography>
                  </Divider>

                  {/* Login Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      py: 1.5,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      borderWidth: '2px',
                      borderColor: 'rgba(99, 102, 241, 0.4)',
                      color: '#6366f1',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'none',
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
                    Masuk ke Akun
                  </Button>
                </Box>
              </Fade>
            </CardContent>
          </Card>
                </Zoom>
      </Container>
    </Box>
  );
};

export default Register;
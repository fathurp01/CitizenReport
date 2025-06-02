import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <ReportIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Laporan Mudah',
      description: 'Laporkan masalah infrastruktur secara digital dan cepat.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Respon Cepat',
      description: 'Tindak lanjut langsung oleh petugas desa.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Transparansi',
      description: 'Pantau status dan progres laporan Anda.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Keamanan',
      description: 'Data Anda aman dan terlindungi.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: 'white', 
          color: 'text.primary',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold', 
              color: 'primary.main',
              fontSize: '1.3rem'
            }}
          >
            CitizenReport
          </Typography>
          <Button 
            color="primary" 
            onClick={() => navigate('/login')} 
            sx={{ 
              mr: 2,
              px: 3,
              py: 1,
              borderRadius: '12px',
              fontWeight: 'bold',
              border: '2px solid',
              borderColor: 'primary.main',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(30, 58, 138, 0.1)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s ease'
              },
              '&:hover': {
                backgroundColor: 'rgba(30, 58, 138, 0.08)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(30, 58, 138, 0.2)'
              },
              '&:hover::before': {
                transform: 'translateX(100%)'
              }
            }}
          >
            Masuk
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/register')} 
            sx={{ 
              px: 3,
              py: 1,
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(30, 58, 138, 0.4)'
              }
            }}
          >
            Daftar
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 10, md: 14 },
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  animation: 'fadeIn 1s ease-out',
                  lineHeight: 1.2
                }}
              >
                Laporkan Masalah di Lingkungan Anda
              </Typography>
              <Typography
                variant="h5"
                color="white"
                sx={{
                  mb: 5,
                  opacity: 0.95,
                  maxWidth: 600,
                  animation: 'slideInUp 1s ease-out',
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                Platform pelaporan masalah lingkungan yang mudah dan cepat
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/citizen/create-report')}
                  sx={{
                    borderColor: '#764ba2',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    px: 4,
                    py: 1.5,
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 10px rgba(118, 75, 162, 0.3)',
                    zIndex: 1, // Memastikan teks tetap di atas
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transition: 'transform 0.4s ease',
                      zIndex: -1 // Memastikan pseudo-element berada di bawah teks
                    },
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 15px rgba(118, 75, 162, 0.4)'
                    },
                    '&:hover::before': {
                      transform: 'translateX(100%)'
                    },
                    '& .MuiButton-endIcon': {
                      position: 'relative',
                      zIndex: 1, // Memastikan ikon tetap di atas
                      transition: 'transform 0.3s ease'
                    },
                    '&:hover .MuiButton-endIcon': {
                      transform: 'translateX(4px)'
                    }
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Mulai Laporan
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'white',
                    borderWidth: '2px',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    px: 4,
                    py: 1.5,
                    // Menghapus mt untuk menghindari margin top pada layar kecil
                    // Menghapus ml untuk konsistensi dengan gap
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(255,255,255,0.1)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.3s ease',
                      zIndex: -1 // Memastikan pseudo-element berada di bawah teks
                    },
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: 'rgba(255,255,255,0.15)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
                    },
                    '&:hover::before': {
                      transform: 'translateX(100%)'
                    }
                  }}
                >
                  Sudah Punya Akun?
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: { xs: 350, md: 450 } 
              }}>                
                <Paper
                  elevation={20}
                  sx={{
                    p: 5,
                    borderRadius: '20px',
                    bgcolor: 'rgba(255,255,255,0.98)',
                    maxWidth: 420,
                    width: '100%',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    zIndex: 1,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-3px',
                      background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea, #764ba2)',
                      backgroundSize: '400% 400%',
                      zIndex: -1,
                      borderRadius: '23px',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      animation: 'none'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'white',
                      borderRadius: '20px',
                      zIndex: -1
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 25px 50px rgba(118, 75, 162, 0.25)'
                    },
                    '&:hover::before': {
                      opacity: 1,
                      animation: 'gradientBorder 3s linear infinite'
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
                    textAlign: 'center', 
                    color: 'text.primary',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <ReportIcon sx={{ 
                      fontSize: 70, 
                      color: 'primary.main', 
                      mb: 3,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                      transition: 'transform 0.3s ease',
                      '.MuiPaper-root:hover &': {
                        transform: 'scale(1.1)'
                      }
                    }} />
                    <Typography variant="h6" gutterBottom sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '1.3rem'
                    }}>
                      Laporan Real-time
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{
                      lineHeight: 1.6,
                      fontSize: '1rem'
                    }}>
                      Pantau status laporan Anda secara real-time dan dapatkan notifikasi update terbaru.
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: 'text.primary'
          }}
        >
          Fitur Unggulan
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={4}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent 0%, #667eea 25%, #764ba2 50%, #667eea 75%, transparent 100%)',
                    transform: 'translateX(-50%) scaleX(0)',
                    transition: 'transform 0.3s ease'
                  },
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    borderColor: 'rgba(102, 126, 234, 0.3)'
                  },
                  '&:hover::before': {
                    transform: 'translateX(-50%) scaleX(1)'
                  }
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 0
                }}>
                  <Box sx={{ 
                    mb: 3,
                    transition: 'transform 0.3s ease',
                    '.MuiCard-root:hover &': {
                      transform: 'scale(1.1)'
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '1.2rem',
                      color: 'text.primary'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      textAlign: 'center'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;

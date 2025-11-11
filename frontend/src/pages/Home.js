import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Fade,
  Slide,
  Zoom,
  Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReportIcon from '@mui/icons-material/Report';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@mui/system';

// Animations consistent with other pages
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const floatGentle = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const slideInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setCardsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      // Redirect based on user role
      if (user.role === 'citizen') {
        navigate('/citizen/dashboard');
      } else if (user.role === 'village_staff') {
        navigate('/staff/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)',
      backgroundSize: '400% 400%',
      animation: `${gradientShift} 15s ease infinite`,
      position: 'relative',
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
    }}>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Slide direction="down" in={isVisible} timeout={800}>
          <Box 
            sx={{ 
              py: 8,
              mb: 6,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Container maxWidth="md">
              <Fade in={isVisible} timeout={1000}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.02em',
                      animation: `${slideInUp} 1s ease-out`
                    }}
                  >
                    Citizen Report
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      fontSize: { xs: '1.25rem', md: '1.75rem' },
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      opacity: 0.95,
                      animation: `${slideInUp} 1s ease-out 0.2s both`
                    }}
                  >
                    Laporkan masalah lingkungan di sekitar Anda dengan mudah
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                      opacity: 0.9,
                      maxWidth: '600px',
                      mx: 'auto',
                      animation: `${slideInUp} 1s ease-out 0.4s both`
                    }}
                  >
                    Platform pelaporan masyarakat untuk meningkatkan kualitas lingkungan dan layanan publik di desa Anda.
                  </Typography>
                  
                  <Zoom in={isVisible} timeout={1200}>
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={handleGetStarted}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        py: 1.8,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#6366f1',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        textTransform: 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-3px) scale(1.05)',
                          background: 'rgba(255, 255, 255, 1)',
                          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
                          color: '#4f46e5'
                        },
                        '&:active': {
                          transform: 'translateY(-1px) scale(1.02)'
                        }
                      }}
                    >
                      {user ? 'Buka Dashboard' : 'Mulai Sekarang'}
                    </Button>
                  </Zoom>
                </Box>
              </Fade>
            </Container>
          </Box>
        </Slide>
      </Box>

      {/* Features Section */}
      <Box sx={{ position: 'relative', zIndex: 2, pb: 8 }}>
        <Container maxWidth="lg">
          <Fade in={cardsVisible} timeout={800}>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              sx={{ 
                mb: 6,
                fontWeight: 700,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Fitur Utama
            </Typography>
          </Fade>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Grow in={cardsVisible} timeout={1000}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(25px) saturate(200%)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                      background: 'rgba(255, 255, 255, 1)'
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <ReportIcon sx={{ fontSize: 48, color: 'white', mb: 1, animation: `${floatGentle} 3s ease-in-out infinite` }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Laporkan Masalah</Typography>
                    </Box>
                  </CardMedia>
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div"
                      sx={{ 
                        fontWeight: 700,
                        color: '#1f2937',
                        mb: 2
                      }}
                    >
                      Kirim Laporan
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      Laporkan masalah seperti jalan rusak, tumpukan sampah, banjir, atau lampu jalan mati dengan mudah melalui aplikasi.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Grow in={cardsVisible} timeout={1200}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(25px) saturate(200%)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                      background: 'rgba(255, 255, 255, 1)'
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <TrackChangesIcon sx={{ fontSize: 48, color: 'white', mb: 1, animation: `${floatGentle} 3s ease-in-out infinite 0.5s` }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Pantau Status</Typography>
                    </Box>
                  </CardMedia>
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div"
                      sx={{ 
                        fontWeight: 700,
                        color: '#1f2937',
                        mb: 2
                      }}
                    >
                      Lacak Progres
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      Pantau status laporan Anda secara real-time. Dapatkan notifikasi saat laporan Anda ditindaklanjuti.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Grow in={cardsVisible} timeout={1400}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(25px) saturate(200%)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                      background: 'rgba(255, 255, 255, 1)'
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <VisibilityIcon sx={{ fontSize: 48, color: 'white', mb: 1, animation: `${floatGentle} 3s ease-in-out infinite 1s` }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Transparansi</Typography>
                    </Box>
                  </CardMedia>
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div"
                      sx={{ 
                        fontWeight: 700,
                        color: '#1f2937',
                        mb: 2
                      }}
                    >
                      Transparansi Penanganan
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      Lihat tindakan yang diambil oleh petugas desa dalam menangani laporan masyarakat.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
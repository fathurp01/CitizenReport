import React, { useEffect, useState } from 'react';
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
  Paper,
  Avatar,
  Divider,
  Stack,
  Chip,
  Fade,
  Slide,
  Zoom,
  Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import StarIcon from '@mui/icons-material/Star';
import QuoteIcon from '@mui/icons-material/FormatQuote';
import { keyframes } from '@mui/system';

// Animasi keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideInLeft = keyframes`
  0% { transform: translateX(-100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  0% { transform: translateX(100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isVisible, setIsVisible] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setAnimateStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <ReportIcon sx={{ fontSize: { xs: 64, md: 80 }, color: '#6366f1' }} />,
      title: 'Laporan Mudah',
      description: 'Laporkan masalah infrastruktur secara digital dan cepat dengan interface yang user-friendly.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: { xs: 64, md: 80 }, color: '#6366f1' }} />,
      title: 'Respon Cepat',
      description: 'Sistem notifikasi real-time memastikan tindak lanjut langsung oleh petugas desa.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: { xs: 64, md: 80 }, color: '#6366f1' }} />,
      title: 'Transparansi',
      description: 'Pantau status dan progres laporan Anda dengan dashboard yang transparan dan informatif.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: { xs: 64, md: 80 }, color: '#6366f1' }} />,
      title: 'Keamanan',
      description: 'Data Anda dilindungi dengan enkripsi tingkat enterprise dan sistem backup otomatis.'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Laporan Terselesaikan', icon: <CheckCircleIcon sx={{ fontSize: 40 }} /> },
    { number: '98%', label: 'Tingkat Kepuasan', icon: <TrendingUpIcon sx={{ fontSize: 40 }} /> },
    { number: '24/7', label: 'Dukungan Pelanggan', icon: <SupportAgentIcon sx={{ fontSize: 40 }} /> },
    { number: '100%', label: 'Data Terlindungi', icon: <VerifiedUserIcon sx={{ fontSize: 40 }} /> }
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Warga RT 05',
      avatar: 'BS',
      rating: 5,
      comment: 'Platform yang sangat membantu! Laporan saya tentang jalan rusak ditindaklanjuti dengan cepat dan transparan.'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Ketua RW 03',
      avatar: 'SN',
      rating: 5,
      comment: 'Interface yang mudah digunakan dan sistem tracking yang excellent. Sangat membantu koordinasi dengan warga.'
    },
    {
      name: 'Ahmad Wijaya',
      role: 'Warga RT 02',
      avatar: 'AW',
      rating: 5,
      comment: 'Respon time yang luar biasa cepat. Masalah sampah di lingkungan kami teratasi dalam 2 hari!'
    }
  ];

  const benefits = [
    'Pelaporan 24/7 tanpa batas waktu',
    'Tracking real-time status laporan',
    'Notifikasi otomatis via email & SMS',
    'Dashboard analytics untuk petugas',
    'Sistem backup data otomatis',
    'Support multi-platform (Web & Mobile)'
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Header dengan animasi slide down */}
      <Slide direction="down" in={isVisible} timeout={800}>
        <AppBar 
          position="static" 
          elevation={0} 
          sx={{ 
            bgcolor: 'white', 
            color: '#1f2937',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <Toolbar sx={{ py: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                color: '#6366f1',
                fontSize: '1.5rem',
                letterSpacing: '-0.025em'
              }}
            >
              CitizenReport
            </Typography>
            <Button 
              onClick={() => navigate('/login')} 
              sx={{ 
                mr: 3,
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                color: '#6366f1',
                fontSize: '0.95rem',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  transform: 'translateY(-2px) scale(1.02)'
                }
              }}
            >
              Masuk
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/register')} 
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                bgcolor: '#6366f1',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#5855eb',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 12px 30px rgba(99, 102, 241, 0.4)'
                }
              }}
            >
              Daftar Gratis
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Hero Section dengan animasi yang diperbaiki */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          py: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box sx={{ animation: `${slideInLeft} 1s ease-out` }}>
                  <Chip 
                    label="🚀 Platform Terpercaya #1 di Indonesia" 
                    sx={{ 
                      mb: 4, 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '20px',
                      px: 3,
                      py: 1,
                      fontSize: '1rem',
                      animation: `${pulse} 2s infinite`
                    }} 
                  />
                  <Typography
                    variant={isMobile ? 'h3' : 'h2'}
                    component="h1"
                    sx={{ 
                      fontWeight: 800, 
                      mb: 4, 
                      lineHeight: 1.1,
                      letterSpacing: '-0.025em',
                      fontSize: { xs: '2.5rem', md: '3.5rem' }
                    }}
                  >
                    Laporkan Masalah di Lingkungan Anda dengan Mudah
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 6,
                      opacity: 0.9,
                      lineHeight: 1.6,
                      fontWeight: 400,
                      fontSize: { xs: '1.1rem', md: '1.3rem' }
                    }}
                  >
                    Platform digital terdepan untuk pelaporan masalah infrastruktur dengan sistem tracking real-time dan respon cepat dari petugas desa.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' }, mb: 4 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/citizen/create-report')}
                      sx={{
                        bgcolor: 'white',
                        color: '#6366f1',
                        fontWeight: 600,
                        borderRadius: '12px',
                        px: 6,
                        py: 2.5,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        boxShadow: '0 4px 14px rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#f8fafc',
                          transform: 'translateY(-3px) scale(1.05)',
                          boxShadow: '0 12px 30px rgba(255, 255, 255, 0.4)'
                        }
                      }}
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 24 }} />}
                    >
                      Mulai Laporan Sekarang
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{
                        borderColor: 'white',
                        borderWidth: '2px',
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: '12px',
                        px: 6,
                        py: 2.5,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          borderColor: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-3px) scale(1.05)'
                        }
                      }}
                    >
                      Lihat Demo
                    </Button>
                  </Box>
                  <Typography variant="body1" sx={{ opacity: 0.8, fontSize: '1rem' }}>
                    ✅ Gratis selamanya • ✅ Tanpa iklan • ✅ Data aman terlindungi
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={isVisible} timeout={1200}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: { xs: 400, md: 500 },
                  animation: `${slideInRight} 1s ease-out`
                }}>                
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 4, md: 8 },
                      borderRadius: '32px',
                      bgcolor: 'rgba(255,255,255,0.95)',
                      maxWidth: 450,
                      width: '100%',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.4s ease',
                      animation: `${float} 6s ease-in-out infinite`,
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      textAlign: 'center', 
                      color: '#1f2937'
                    }}>
                      <ReportIcon sx={{ 
                        fontSize: { xs: 100, md: 120 }, 
                        color: '#6366f1', 
                        mb: 4,
                        animation: `${pulse} 3s infinite`
                      }} />
                      <Typography variant="h4" gutterBottom sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        color: '#1f2937',
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}>
                        Dashboard Real-time
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{
                        lineHeight: 1.6,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        mb: 4
                      }}>
                        Pantau status laporan Anda secara real-time dengan notifikasi instant.
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                        {[1,2,3,4,5].map((star) => (
                          <StarIcon key={star} sx={{ color: '#fbbf24', fontSize: 28 }} />
                        ))}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                        Rating 4.9/5 dari 2,500+ pengguna
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section dengan animasi counter */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Grow in={animateStats} timeout={1000 + index * 200}>
                <Box sx={{ 
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.05)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'inline-flex',
                    p: 3,
                    borderRadius: '20px',
                    bgcolor: '#f1f5f9',
                    color: '#6366f1',
                    mb: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#6366f1',
                      color: 'white',
                      transform: 'scale(1.1)'
                    }
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 800, 
                    color: '#1f2937', 
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section dengan animasi stagger */}
      <Box sx={{ bgcolor: 'white', py: 15 }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1500}>
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 4,
                  color: '#1f2937',
                  letterSpacing: '-0.025em',
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Fitur Unggulan Platform
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.3rem' }
              }}>
                Solusi lengkap untuk pelaporan masalah lingkungan dengan teknologi terdepan
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={isVisible} timeout={1500 + index * 300}>
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: 'center',
                      p: { xs: 3, md: 5 },
                      height: { xs: '350px', md: '400px' },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '24px',
                      border: '1px solid #e5e7eb',
                      bgcolor: 'white',
                      transition: 'all 0.4s ease',
                      animation: `${fadeInUp} 1s ease-out ${index * 0.2}s both`,
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 25px 50px rgba(99, 102, 241, 0.15)',
                        borderColor: '#6366f1'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ 
                        mb: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)'
                        }
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ 
                        fontWeight: 700, 
                        color: '#1f2937',
                        mb: 3,
                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ 
                        lineHeight: 1.6,
                        fontSize: { xs: '0.95rem', md: '1.1rem' }
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ... existing code ... */}
      
      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              color: '#1f2937',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Apa Kata Pengguna Kami
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.3rem' }
          }}>
            Testimoni nyata dari ribuan pengguna yang telah merasakan manfaatnya
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in={isVisible} timeout={2000 + index * 200}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '280px',
                    borderRadius: '20px',
                    border: '1px solid #e5e7eb',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <QuoteIcon sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16, 
                    color: '#6366f1', 
                    opacity: 0.3,
                    fontSize: 40
                  }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: '#6366f1', 
                      mr: 2, 
                      width: 56, 
                      height: 56,
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ 
                    lineHeight: 1.6, 
                    fontStyle: 'italic',
                    fontSize: '1rem'
                  }}>
                    "{testimonial.comment}"
                  </Typography>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 4,
                  color: '#1f2937',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Mengapa Memilih CitizenReport?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ 
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.2rem' }
              }}>
                Platform terlengkap dengan fitur-fitur canggih untuk kemudahan pelaporan
              </Typography>
              <Stack spacing={2}>
                {benefits.map((benefit, index) => (
                  <Fade in={isVisible} timeout={2500 + index * 100} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(10px)'
                      }
                    }}>
                      <CheckCircleIcon sx={{ 
                        color: '#10b981', 
                        mr: 2, 
                        fontSize: 28
                      }} />
                      <Typography variant="body1" sx={{ 
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }}>
                        {benefit}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={isVisible} timeout={2000}>
                <Box sx={{ 
                  textAlign: 'center',
                  animation: `${float} 8s ease-in-out infinite`
                }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 6,
                      borderRadius: '24px',
                      bgcolor: 'white',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <SecurityIcon sx={{ 
                      fontSize: 100, 
                      color: '#6366f1', 
                      mb: 3,
                      animation: `${pulse} 4s infinite`
                    }} />
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' }
                    }}>
                      Keamanan Terjamin
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{
                      fontSize: '1.1rem'
                    }}>
                      Data Anda dilindungi dengan teknologi enkripsi tingkat militer
                    </Typography>
                  </Paper>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: '#6366f1', 
        color: 'white', 
        py: 12,
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Siap Memulai Pelaporan?
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 6, 
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}>
              Bergabunglah dengan ribuan warga yang telah merasakan kemudahan CitizenReport
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  bgcolor: 'white',
                  color: '#6366f1',
                  fontWeight: 600,
                  px: 8,
                  py: 2.5,
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    transform: 'translateY(-3px) scale(1.05)'
                  }
                }}
              >
                Mulai Gratis
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  px: 8,
                  py: 2.5,
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  textTransform: 'none',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-3px) scale(1.05)'
                  }
                }}
              >
                Hubungi Kami
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#6366f1' }}>
                CitizenReport
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
                Platform digital terpercaya untuk pelaporan masalah infrastruktur dengan sistem tracking real-time.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                © 2024 CitizenReport. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Platform
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Fitur
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Harga
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Demo
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Dukungan
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Bantuan
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Kontak
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  FAQ
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Perusahaan
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Tentang
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Blog
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Karir
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Privasi
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Syarat
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Cookies
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Dibuat dengan ❤️ untuk masyarakat Indonesia
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
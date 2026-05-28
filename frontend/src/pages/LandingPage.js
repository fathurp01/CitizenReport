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
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GroupsIcon from '@mui/icons-material/Groups';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { keyframes } from '@mui/system';

// Smooth animations
const floatGentle = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const slideInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
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
      icon: <ReportIcon sx={{ fontSize: 64, color: '#6366f1' }} />,
      title: 'Laporan Mudah',
      description: 'Laporkan masalah infrastruktur secara digital dengan interface yang intuitif dan user-friendly.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 64, color: '#8b5cf6' }} />,
      title: 'Respon Cepat',
      description: 'Sistem notifikasi real-time memastikan tindak lanjut langsung dari petugas yang bertanggung jawab.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 64, color: '#06b6d4' }} />,
      title: 'Transparansi',
      description: 'Pantau status dan progres laporan Anda dengan dashboard yang transparan dan informatif.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 64, color: '#10b981' }} />,
      title: 'Keamanan',
      description: 'Data Anda dilindungi dengan enkripsi tingkat enterprise dan sistem backup otomatis.'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Laporan Terselesaikan', icon: <CheckCircleIcon sx={{ fontSize: 32 }} /> },
    { number: '98%', label: 'Tingkat Kepuasan', icon: <TrendingUpIcon sx={{ fontSize: 32 }} /> },
    { number: '24/7', label: 'Dukungan Pelanggan', icon: <SupportAgentIcon sx={{ fontSize: 32 }} /> },
    { number: '100%', label: 'Data Terlindungi', icon: <VerifiedUserIcon sx={{ fontSize: 32 }} /> }
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
      {/* Enhanced Header */}
      <Slide direction="down" in={isVisible} timeout={600}>
        <AppBar 
          position="static" 
          elevation={0} 
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(10px)',
            color: '#1f2937',
            borderBottom: '1px solid rgba(99, 102, 241, 0.1)'
          }}
        >
          <Toolbar sx={{ py: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <LocationCityIcon sx={{ color: '#6366f1', mr: 1, fontSize: 28 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1f2937',
                  fontSize: '1.4rem',
                  letterSpacing: '-0.02em'
                }}
              >
                CitizenReport
              </Typography>
            </Box>
            <Button 
              onClick={() => navigate('/login')} 
              sx={{ 
                mr: 2,
                px: 3,
                py: 1,
                borderRadius: '8px',
                fontWeight: 500,
                color: '#6366f1',
                textTransform: 'none',
                '&:hover': { bgcolor: '#f8fafc' }
              }}
            >
              Masuk
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/register')} 
              sx={{ 
                px: 4,
                py: 1,
                borderRadius: '8px',
                fontWeight: 600,
                textTransform: 'none',
                bgcolor: '#6366f1',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
                '&:hover': {
                  bgcolor: '#5855eb',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }
              }}
            >
              Daftar
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Hero Section with Visual Enhancement */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={800}>
                <Box sx={{ animation: `${slideInUp} 0.8s ease-out` }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }} alignItems="flex-start">
                    <Chip 
                      label="🚀 Platform Terpercaya #1 di Indonesia" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.15)', 
                        color: 'white',
                        fontWeight: 500,
                        borderRadius: '16px',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.9rem'
                      }} 
                    />
                    <Chip 
                      label="🇺🇳 Mendukung SDG 16: Keadilan & Kelembagaan Tangguh" 
                      sx={{ 
                        bgcolor: 'rgba(12, 64, 106, 0.45)', 
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.9rem'
                      }} 
                    />
                  </Stack>
                  <Typography
                    variant={isMobile ? 'h3' : 'h2'}
                    component="h1"
                    sx={{ 
                      fontWeight: 700, 
                      mb: 3, 
                      lineHeight: 1.2,
                      fontSize: { xs: '2.2rem', md: '3rem' }
                    }}
                  >
                    Laporkan Masalah di Lingkungan Anda dengan Mudah
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      lineHeight: 1.6,
                      fontWeight: 400,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    Platform digital terdepan untuk pelaporan masalah infrastruktur dengan sistem tracking real-time dan respon cepat dari petugas desa.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/citizen/create-report')}
                      sx={{
                        bgcolor: 'white',
                        color: '#6366f1',
                        fontWeight: 600,
                        borderRadius: '10px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          bgcolor: '#f8fafc',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Mulai Laporan Sekarang
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        fontWeight: 500,
                        borderRadius: '10px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        '&:hover': { 
                          borderColor: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      Lihat Demo
                    </Button>
                  </Stack>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  ✅ Respon Cepat • ✅ Data aman terlindungi
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={isVisible} timeout={1000}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  animation: `${floatGentle} 4s ease-in-out infinite`
                }}>
                  {/* Mockup Dashboard */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      bgcolor: 'rgba(255,255,255,0.95)',
                      maxWidth: 400,
                      width: '100%',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Box sx={{ textAlign: 'center', color: '#1f2937' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 3,
                        position: 'relative'
                      }}>
                        <Box sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: '#f0f9ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}>
                          <ReportIcon sx={{ fontSize: 40, color: '#6366f1' }} />
                          <Box sx={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <CheckCircleIcon sx={{ fontSize: 12, color: 'white' }} />
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ 
                        fontWeight: 600,
                        mb: 2
                      }}>
                        Dashboard Real-time
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Pantau status laporan Anda secara real-time dengan notifikasi instant
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                        {[1,2,3,4,5].map((star) => (
                          <StarIcon key={star} sx={{ color: '#fbbf24', fontSize: 20 }} />
                        ))}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
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

      {/* Community Showcase */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1200}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 600, 
                mb: 3,
                color: '#1f2937'
              }}>
                Dipercaya oleh Komunitas di Seluruh Indonesia
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                {/* Community Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupsIcon sx={{ color: '#6366f1', fontSize: 32 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>15+ Desa</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationCityIcon sx={{ color: '#8b5cf6', fontSize: 32 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>50+ RT/RW</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon sx={{ color: '#06b6d4', fontSize: 32 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>5,000+ Warga</Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* SDG 16 Commitment Section */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #0a3a60 0%, #1c5a90 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background circle */}
        <Box sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none'
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                <Box sx={{ 
                  width: 90, 
                  height: 90, 
                  borderRadius: '16px', 
                  bgcolor: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  mb: 3
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#0a3a60' }}>16</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em', mb: 1, textTransform: 'uppercase' }}>
                  Aksi PBB & SDGs
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.8rem', md: '2.3rem' } }}>
                  SDG 16: Perdamaian, Keadilan, dan Kelembagaan yang Tangguh
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7, mb: 4 }}>
                  CitizenReport berkomitmen penuh dalam mendukung program PBB Sustainable Development Goals (SDGs), khususnya Goal 16, dengan mewujudkan tata kelola desa yang transparan, adil, inklusif, dan akuntabel.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://sdgs.bappenas.go.id/tujuan-16/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.4)',
                    borderRadius: '10px',
                    px: 4,
                    py: 1.2,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.08)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  Pelajari Selengkapnya tentang SDG 16
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ 
                    p: 4, 
                    borderRadius: '20px', 
                    bgcolor: 'rgba(255,255,255,0.06)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      bgcolor: 'rgba(255,255,255,0.09)'
                    }
                  }}>
                    <AccountBalanceIcon sx={{ fontSize: 40, color: '#60a5fa', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>Kelembagaan Akuntabel</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      Membangun kelembagaan desa yang transparan dan efisien dengan menyediakan rekam jejak digital laporan dan respons aparat yang terbuka serta akuntabel.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ 
                    p: 4, 
                    borderRadius: '20px', 
                    bgcolor: 'rgba(255,255,255,0.06)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      bgcolor: 'rgba(255,255,255,0.09)'
                    }
                  }}>
                    <GavelIcon sx={{ fontSize: 40, color: '#60a5fa', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>Akses Keadilan Sosial</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      Menjamin keadilan sosial bagi seluruh lapisan masyarakat dalam menyampaikan aspirasi pembangunan atau kerusakan infrastruktur tanpa diskriminasi.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ 
                    p: 4, 
                    borderRadius: '20px', 
                    bgcolor: 'rgba(255,255,255,0.06)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      bgcolor: 'rgba(255,255,255,0.09)'
                    }
                  }}>
                    <GroupsIcon sx={{ fontSize: 40, color: '#60a5fa', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>Partisipasi Inklusif</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      Meningkatkan partisipasi aktif warga dalam pengambilan keputusan dan pengawasan publik di tingkat daerah demi kelembagaan yang responsif.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ 
                    p: 4, 
                    borderRadius: '20px', 
                    bgcolor: 'rgba(255,255,255,0.06)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      bgcolor: 'rgba(255,255,255,0.09)'
                    }
                  }}>
                    <SecurityIcon sx={{ fontSize: 40, color: '#60a5fa', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>Lingkungan Damai</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      Menyelesaikan konflik/kerusakan lingkungan dengan koordinasi yang harmonis antara warga dan aparat, menciptakan lingkungan yang kondusif.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow in={animateStats} timeout={600 + index * 100}>
                  <Paper
                    elevation={0}
                    sx={{ 
                      textAlign: 'center',
                      p: 3,
                      borderRadius: '16px',
                      bgcolor: 'white',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: '#f1f5f9',
                      color: '#6366f1',
                      mb: 2
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      color: '#1f2937', 
                      mb: 1
                    }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  color: '#1f2937',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Fitur Unggulan Platform
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ 
                maxWidth: 600, 
                mx: 'auto'
              }}>
                Solusi lengkap untuk pelaporan masalah lingkungan dengan teknologi terdepan
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={isVisible} timeout={1200 + index * 200}>
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      height: '100%',
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      bgcolor: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
                        borderColor: feature.icon.props.sx.color
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ 
                        fontWeight: 600, 
                        color: '#1f2937',
                        mb: 2
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        lineHeight: 1.6
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

      {/* Testimonials Section */}
      <Box sx={{ py: 12, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: '#1f2937'
              }}
            >
              Apa Kata Pengguna Kami
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Testimoni nyata dari ribuan pengguna yang telah merasakan manfaatnya
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={isVisible} timeout={1400 + index * 200}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      bgcolor: 'white',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <QuoteIcon sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16, 
                      color: '#6366f1', 
                      opacity: 0.2,
                      fontSize: 32
                    }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: '#6366f1', 
                        mr: 2, 
                        width: 48, 
                        height: 48
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 18 }} />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ 
                      lineHeight: 1.6, 
                      fontStyle: 'italic'
                    }}>
                      "{testimonial.comment}"
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 12, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  color: '#1f2937'
                }}
              >
                Mengapa Memilih CitizenReport?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ 
                mb: 4,
                fontSize: '1.1rem'
              }}>
                Platform terlengkap dengan fitur-fitur canggih untuk kemudahan pelaporan
              </Typography>
              <Stack spacing={2}>
                {benefits.map((benefit, index) => (
                  <Fade in={isVisible} timeout={1600 + index * 100} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon sx={{ 
                        color: '#10b981', 
                        mr: 2, 
                        fontSize: 24
                      }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {benefit}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={isVisible} timeout={1800}>
                <Box sx={{ textAlign: 'center' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 6,
                      borderRadius: '20px',
                      bgcolor: '#f8fafc',
                      border: '1px solid #e5e7eb',
                      animation: `${scaleIn} 0.6s ease-out`
                    }}
                  >
                    <SecurityIcon sx={{ 
                      fontSize: 80, 
                      color: '#6366f1', 
                      mb: 3
                    }} />
                    <Typography variant="h5" sx={{ 
                      fontWeight: 600, 
                      mb: 2
                    }}>
                      Keamanan Terjamin
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
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
        py: 10,
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 3
              }}
            >
              Siap Memulai Pelaporan?
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 5, 
              opacity: 0.9
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
                  px: 6,
                  py: 2,
                  borderRadius: '10px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    transform: 'translateY(-2px)'
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
                  px: 6,
                  py: 2,
                  borderRadius: '10px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
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
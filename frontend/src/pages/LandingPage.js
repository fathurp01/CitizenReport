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
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
            CitizenReport
          </Typography>
          <Button color="primary" onClick={() => navigate('/login')} sx={{ mr: 1 }}>
            Masuk
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
            Daftar
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                sx={{ fontWeight: 700, mb: 2, animation: 'fadeIn 1s ease-out' }}
              >
                Laporkan Masalah di Lingkungan Anda
              </Typography>
              <Typography
                variant="h5"
                color="white"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: 600,
                  animation: 'slideInUp 1s ease-out',
                  lineHeight: 1.6
                }}
              >
                Platform pelaporan masalah lingkungan yang mudah dan cepat
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                    px: 4,
                    py: 1.5
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
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Sudah Punya Akun?
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: 300, md: 400 } }}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    maxWidth: 400,
                    width: '100%'
                  }}
                >
                  <Box sx={{ textAlign: 'center', color: 'text.primary' }}>
                    <ReportIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Laporan Real-time
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Fitur Unggulan
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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

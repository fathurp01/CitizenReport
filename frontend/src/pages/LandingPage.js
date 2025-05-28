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
  Paper,
  Chip
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
      description: 'Laporkan masalah infrastruktur dengan mudah melalui platform digital yang user-friendly.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Respon Cepat',
      description: 'Tim desa akan merespon laporan Anda dengan cepat dan memberikan update status secara real-time.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Transparansi',
      description: 'Pantau progress penanganan laporan Anda dengan sistem tracking yang transparan.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Aman & Terpercaya',
      description: 'Data Anda aman dengan sistem keamanan berlapis dan verifikasi identitas.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
            CitizenReport
          </Typography>
          <Button 
            color="primary" 
            onClick={() => navigate('/login')}
            sx={{ mr: 1 }}
          >
            Masuk
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/register')}
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
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? 'h3' : 'h2'} 
                component="h1" 
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 3 }}
              >
                Laporkan Masalah Desa Anda
              </Typography>
              <Typography 
                variant="h6" 
                paragraph 
                sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
              >
                Platform digital untuk melaporkan masalah infrastruktur desa. 
                Bersama-sama kita wujudkan desa yang lebih baik melalui partisipasi aktif warga.
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 300, md: 400 }
                }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
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
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Mengapa Pilih CitizenReport?
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Platform yang dirancang khusus untuk memudahkan warga dalam melaporkan 
          dan memantau penanganan masalah infrastruktur desa.
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
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
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
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

      {/* Statistics Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Dampak Nyata untuk Desa
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  500+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Laporan Terselesaikan
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  1000+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Warga Terdaftar
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  24 Jam
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Rata-rata Respon
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Siap Berkontribusi untuk Desa?
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              Bergabunglah dengan ribuan warga lainnya yang telah mempercayai CitizenReport 
              untuk melaporkan dan memantau masalah infrastruktur desa.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
                px: 6,
                py: 2,
                fontSize: '1.1rem'
              }}
            >
              Daftar Sekarang
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                CitizenReport
              </Typography>
              <Typography variant="body2" color="grey.400">
                Platform digital untuk melaporkan masalah infrastruktur desa. 
                Bersama membangun desa yang lebih baik.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Kontak
              </Typography>
              <Typography variant="body2" color="grey.400">
                Email: info@citizenreport.id
              </Typography>
              <Typography variant="body2" color="grey.400">
                Telepon: (021) 1234-5678
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="grey.400">
              © 2024 CitizenReport. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
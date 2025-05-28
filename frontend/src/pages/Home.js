import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          borderRadius: 2,
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Citizen Report
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Laporkan masalah lingkungan di sekitar Anda dengan mudah
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Platform pelaporan masyarakat untuk meningkatkan kualitas lingkungan dan layanan publik di desa Anda.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={handleGetStarted}
          >
            {user ? 'Buka Dashboard' : 'Mulai Sekarang'}
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          Fitur Utama
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: 'info.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" color="white">Laporkan Masalah</Typography>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kirim Laporan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Laporkan masalah seperti jalan rusak, tumpukan sampah, banjir, atau lampu jalan mati dengan mudah melalui aplikasi.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: 'warning.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" color="white">Pantau Status</Typography>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lacak Progres
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pantau status laporan Anda secara real-time. Dapatkan notifikasi saat laporan Anda ditindaklanjuti.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: 'success.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" color="white">Transparansi</Typography>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Transparansi Penanganan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lihat tindakan yang diambil oleh petugas desa dalam menangani laporan masyarakat.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
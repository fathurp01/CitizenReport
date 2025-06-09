import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  CircularProgress,
  Paper,
  LinearProgress,
  Chip,
  Avatar
} from '@mui/material';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    completedReports: 0,
    pendingReports: 0,
    reportsByCategory: {},
    recentReports: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Gagal memuat statistik dashboard. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'road_damage':
        return 'Kerusakan Jalan';
      case 'garbage':
        return 'Sampah';
      case 'flood':
        return 'Banjir';
      case 'street_light':
        return 'Lampu Jalan';
      case 'other':
        return 'Lainnya';
      default:
        return category;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'road_damage':
        return '#e53e3e';
      case 'garbage':
        return '#38a169';
      case 'flood':
        return '#3182ce';
      case 'street_light':
        return '#d69e2e';
      case 'other':
        return '#805ad5';
      default:
        return '#718096';
    }
  };

  const getCategoryIcon = (category) => {
    const iconStyle = { fontSize: 20, color: getCategoryColor(category) };
    switch (category) {
      case 'road_damage':
        return '🛣️';
      case 'garbage':
        return '🗑️';
      case 'flood':
        return '🌊';
      case 'street_light':
        return '💡';
      case 'other':
        return '📋';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          my: 4 
        }}
      >
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Memuat dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)'
          }}
        >
          <Typography 
            color="error" 
            variant="h6" 
            sx={{ fontWeight: 600 }}
          >
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  const completionRate = stats.totalReports > 0 
    ? ((stats.completedReports / stats.totalReports) * 100).toFixed(1)
    : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Beranda Admin
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
          Pantau dan kelola laporan warga dengan efektif
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              border: '1px solid rgba(25, 118, 210, 0.12)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48, mr: 2 }}>
                  <PeopleIcon sx={{ fontSize: 24 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#1976d2' }}>
                    {stats.totalUsers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Pengguna
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
              border: '1px solid rgba(156, 39, 176, 0.12)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#9c27b0', width: 48, height: 48, mr: 2 }}>
                  <ReportIcon sx={{ fontSize: 24 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                    {stats.totalReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Laporan
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
              border: '1px solid rgba(76, 175, 80, 0.12)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50', width: 48, height: 48, mr: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 24 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#4caf50' }}>
                    {stats.completedReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Selesai
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={parseFloat(completionRate)} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4caf50',
                      borderRadius: 3
                    }
                  }} 
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {completionRate}% tingkat penyelesaian
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%)',
              border: '1px solid rgba(255, 152, 0, 0.12)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.15)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800', width: 48, height: 48, mr: 2 }}>
                  <PendingIcon sx={{ fontSize: 24 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#f57600' }}>
                    {stats.pendingReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Laporan Tertunda
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Reports by Category */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: 'fit-content'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CategoryIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Laporan Berdasarkan Kategori
              </Typography>
            </Box>
            
            {Object.keys(stats.reportsByCategory).length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  Tidak ada laporan tersedia
                </Typography>
              </Box>
            ) : (
              <Box sx={{ space: 2 }}>
                {Object.entries(stats.reportsByCategory).map(([category, count], index) => (
                  <Box 
                    key={category} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between', 
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'grey.50',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2, fontSize: '1.5rem' }}>
                        {getCategoryIcon(category)}
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {getCategoryLabel(category)}
                      </Typography>
                    </Box>
                    <Chip 
                      label={count} 
                      size="small" 
                      sx={{ 
                        bgcolor: getCategoryColor(category),
                        color: 'white',
                        fontWeight: 600,
                        minWidth: 40
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Recent Reports */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: 'fit-content'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccessTimeIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Laporan Terbaru
              </Typography>
            </Box>
            
            {stats.recentReports.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  Tidak ada laporan terbaru
                </Typography>
              </Box>
            ) : (
              <Box>
                {stats.recentReports.map((report, index) => (
                  <Box 
                    key={report._id} 
                    sx={{ 
                      mb: 2,
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'grey.50',
                      borderLeft: '4px solid',
                      borderLeftColor: getCategoryColor(report.category),
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        color: 'text.primary'
                      }}
                    >
                      {report.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label={getCategoryLabel(report.category)}
                        size="small"
                        sx={{ 
                          bgcolor: getCategoryColor(report.category),
                          color: 'white',
                          fontSize: '0.75rem'
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        •
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(report.createdAt).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
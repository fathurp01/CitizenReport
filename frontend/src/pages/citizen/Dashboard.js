import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Chip,
  CircularProgress,
  Fade,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ReportIcon from '@mui/icons-material/Report';
import axios from 'axios';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const viewReport = (reportId) => {
    if (!reportId) {
      console.error('Invalid report ID');
      return;
    }
    navigate(`/citizen/reports/${reportId}`);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports/my-reports');
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(`Failed to load reports: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'default';
      case 'received': return 'primary';
      case 'in_progress': return 'warning';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'received': return 'Received';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Box>
            {/* Header */}
            <Box textAlign="center" mb={5}>
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                Dashboard Warga
              </Typography>
              <Typography 
                variant="h6" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontSize: '1.1rem'
                }}
              >
                Kelola laporan Anda dan pantau perkembangan penanganan masalah
              </Typography>
            </Box>

            {/* Create Report Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/citizen/create-report')}
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#667eea',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(255, 255, 255, 0.4)'
                  }
                }}
              >
                Buat Laporan Baru
              </Button>
            </Box>

            {/* Reports Grid */}
            {loading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress sx={{ color: 'white' }} size={60} />
              </Box>
            ) : error ? (
              <Paper 
                sx={{ 
                  p: 4,
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <Typography color="error" variant="h6">
                  {error}
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {reports.length === 0 ? (
                  <Grid item xs={12}>
                    <Paper 
                      sx={{ 
                        p: 6,
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)'
                      }}
                    >
                      <ReportIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: '#667eea',
                          fontWeight: 'bold',
                          mb: 1
                        }}
                      >
                        Belum Ada Laporan
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ color: 'text.secondary', mb: 3 }}
                      >
                        Mulai buat laporan pertama Anda untuk melaporkan masalah di lingkungan
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/citizen/create-report')}
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '12px',
                          px: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 'bold'
                        }}
                      >
                        Buat Laporan
                      </Button>
                    </Paper>
                  </Grid>
                ) : (
                  reports.map((report) => (
                    <Grid item xs={12} sm={6} md={4} key={report._id}>
                      <Card
                        sx={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(102, 126, 234, 0.25)'
                          }
                        }}
                        onClick={() => viewReport(report._id)}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#667eea',
                              fontWeight: 'bold',
                              mb: 2
                            }}
                          >
                            {report.title}
                          </Typography>
                          
                          <Chip
                            label={getStatusLabel(report.status)}
                            color={getStatusColor(report.status)}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                          
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'text.secondary',
                              mb: 2,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.6
                            }}
                          >
                            {report.description}
                          </Typography>
                          
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'text.disabled',
                              fontSize: '0.85rem'
                            }}
                          >
                            {report.category} • {new Date(report.createdAt).toLocaleDateString('id-ID')}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;

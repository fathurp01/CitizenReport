import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this import

const Dashboard = () => {
  const navigate = useNavigate(); // Add this line
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports. Please try again later.');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'received':
        return 'primary';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'received':
        return 'Received';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'road_damage':
        return 'Road Damage';
      case 'garbage':
        return 'Garbage';
      case 'flood':
        return 'Flood';
      case 'street_light':
        return 'Street Light';
      case 'other':
        return 'Other';
      default:
        return category;
    }
  };

  const filterReports = () => {
    let filteredReports = [...reports];
    
    // Filter by status tab
    if (tabValue === 1) {
      filteredReports = filteredReports.filter(report => report.status === 'pending');
    } else if (tabValue === 2) {
      filteredReports = filteredReports.filter(report => report.status === 'received');
    } else if (tabValue === 3) {
      filteredReports = filteredReports.filter(report => report.status === 'in_progress');
    } else if (tabValue === 4) {
      filteredReports = filteredReports.filter(report => report.status === 'completed');
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredReports = filteredReports.filter(report => 
        report.title.toLowerCase().includes(term) || 
        report.description.toLowerCase().includes(term) ||
        report.address.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (filterCategory) {
      filteredReports = filteredReports.filter(report => report.category === filterCategory);
    }
    
    return filteredReports;
  };

  // Update the function name to match what's used below
  const handleViewReport = (reportId) => {
    navigate(`/staff/reports/${reportId}`);
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
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Dashboard Staff Desa
        </Typography>

        {/* Search and Filter Section */}
        <Card 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              zIndex: 2
            }
          }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Cari laporan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)'
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white'
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white'
                      }
                    }}
                  >
                    <MenuItem value="all">Semua Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="received">Diterima</MenuItem>
                    <MenuItem value="in_progress">Dalam Proses</MenuItem>
                    <MenuItem value="completed">Selesai</MenuItem>
                    <MenuItem value="rejected">Ditolak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs and Reports */}
        <Card 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, #667eea, #764ba2, #667eea)',
              backgroundSize: '200% 200%',
              animation: 'gradientBorder 3s ease infinite',
              zIndex: -1
            },
            '@keyframes gradientBorder': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' }
            }
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 'bold'
              },
              '& .Mui-selected': {
                color: 'white !important'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white'
              }
            }}
          >
            <Tab label="Semua Laporan" />
            <Tab label="Perlu Tindakan" />
          </Tabs>
          
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress sx={{ color: 'white' }} />
              </Box>
            ) : error ? (
              <Typography color="error" align="center" sx={{ color: 'white', opacity: 0.8 }}>
                {error}
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {filteredReports.map((report) => (
                  <Grid item xs={12} sm={6} md={4} key={report._id}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: 'linear-gradient(90deg, #667eea, #764ba2)',
                          transform: 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.3s ease',
                          zIndex: 2
                        },
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(118, 75, 162, 0.3)',
                          background: 'rgba(255, 255, 255, 0.15)'
                        },
                        '&:hover::before': {
                          transform: 'scaleX(1)'
                        }
                      }}
                      onClick={() => navigate(`/staff/reports/${report._id}`)}
                    >
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          component="h2" 
                          gutterBottom
                          sx={{ color: 'white', fontWeight: 'bold' }}
                        >
                          {report.title}
                        </Typography>
                        
                        <Chip
                          label={report.status}
                          color={getStatusColor(report.status)}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {report.description}
                        </Typography>
                        
                        <Typography 
                          variant="caption" 
                          sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                          Oleh: {report.user?.name} • {new Date(report.createdAt).toLocaleDateString('id-ID')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
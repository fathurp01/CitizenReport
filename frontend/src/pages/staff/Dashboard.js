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
  MenuItem,
  Paper,
  Avatar,
  Fade,
  Grow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReportIcon from '@mui/icons-material/Report';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
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
        setError('Gagal memuat laporan. Silakan coba lagi nanti.');
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
        return 'Tertunda';
      case 'received':
        return 'Diterima';
      case 'in_progress':
        return 'Sedang Diproses';
      case 'completed':
        return 'Selesai';
      case 'rejected':
        return 'Ditolak';
      default:
        return 'Tidak Diketahui';
    }
  };

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

  const getCategoryIcon = (category) => {
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
        return '📄';
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

  const handleViewReport = (reportId) => {
    navigate(`/staff/reports/${reportId}`);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box sx={{ mb: 4 }}>
            {/* Professional Header */}
            <Paper 
              elevation={2}
              sx={{ 
                p: 4, 
                borderRadius: 2,
                backgroundColor: '#6366f1',
                color: 'white',
                mb: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: '#4f46e5', 
                  mr: 2, 
                  width: 56, 
                  height: 56
                }}>
                  <ReportIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'white',
                      mb: 1
                    }}
                  >
                    Pengelolaan Laporan
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
                    Kelola laporan dengan mudah dan efisien
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Professional Tabs */}
            <Paper 
              elevation={2}
              sx={{ 
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                mb: 3,
                overflow: 'hidden'
              }}
            >
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    minHeight: 64,
                    color: '#424242',
                    '&.Mui-selected': {
                      color: '#6366f1',
                    }
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    backgroundColor: '#6366f1'
                  }
                }}
              >
                <Tab label="📊 Semua Laporan" />
                <Tab label="⏳ Tertunda" />
                <Tab label="📥 Diterima" />
                <Tab label="🔄 Sedang Diproses" />
                <Tab label="✅ Selesai" />
              </Tabs>
            </Paper>
            
            {/* Professional Search and Filter */}
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                borderRadius: 2,
                backgroundColor: '#ffffff',
                mb: 3,
                border: '1px solid #e0e0e0'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Cari laporan..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                        '&.Mui-focused': {
                          backgroundColor: '#ffffff',
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#757575' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="category-filter-label">Filter berdasarkan Kategori</InputLabel>
                    <Select
                      labelId="category-filter-label"
                      id="category-filter"
                      value={filterCategory}
                      label="Filter berdasarkan Kategori"
                      onChange={handleCategoryChange}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                        '&.Mui-focused': {
                          backgroundColor: '#ffffff',
                        }
                      }}
                    >
                      <MenuItem value="">🏷️ Semua Kategori</MenuItem>
                      <MenuItem value="road_damage">🛣️ Kerusakan Jalan</MenuItem>
                      <MenuItem value="garbage">🗑️ Sampah</MenuItem>
                      <MenuItem value="flood">🌊 Banjir</MenuItem>
                      <MenuItem value="street_light">💡 Lampu Jalan</MenuItem>
                      <MenuItem value="other">📋 Lainnya</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {loading ? (
              <Paper 
                elevation={2}
                sx={{ 
                  p: 6, 
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  border: '1px solid #e0e0e0'
                }}
              >
                <CircularProgress size={60} sx={{ color: '#7B1FA2', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Memuat laporan...
                </Typography>
              </Paper>
            ) : error ? (
              <Paper 
                elevation={2}
                sx={{ 
                  p: 4, 
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  border: '1px solid #f44336'
                }}
              >
                <Typography color="error" variant="h6">
                  {error}
                </Typography>
              </Paper>
            ) : filterReports().length === 0 ? (
              <Paper 
                elevation={2}
                sx={{ 
                  p: 6, 
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  border: '1px solid #e0e0e0'
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, opacity: 0.7 }}>
                  📭
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Tidak ada laporan yang sesuai dengan kriteria Anda.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filterReports().map((report, index) => (
                  <Grid item xs={12} md={6} key={report.id}>
                    <Grow 
                      in={true} 
                      timeout={300 + (index * 100)}
                      style={{ transformOrigin: '0 0 0' }}
                    >
                      <Card 
                        elevation={2}
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          cursor: 'pointer',
                          borderRadius: 2,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                            borderColor: '#7B1FA2',
                          }
                        }}
                        onClick={() => handleViewReport(report.id)}
                      >
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          {/* Header with Icon and Status */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <Avatar sx={{ 
                              mr: 2, 
                              bgcolor: '#f5f5f5',
                              fontSize: '1.5rem',
                              width: 48,
                              height: 48,
                              border: '2px solid #e0e0e0'
                            }}>
                              {getCategoryIcon(report.category)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography 
                                variant="h6" 
                                component="h2" 
                                sx={{ 
                                  fontWeight: 600,
                                  color: '#212121',
                                  lineHeight: 1.2,
                                  mb: 1
                                }}
                              >
                                {report.title}
                              </Typography>
                              <Chip 
                                label={getStatusLabel(report.status)} 
                                color={getStatusColor(report.status)} 
                                size="small"
                                sx={{ 
                                  fontWeight: 600,
                                  borderRadius: 2
                                }}
                              />
                            </Box>
                          </Box>

                          {/* Description */}
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mb: 3,
                              lineHeight: 1.6,
                              fontSize: '0.95rem',
                              color: '#424242'
                            }}
                          >
                            {report.description.length > 100 
                              ? `${report.description.substring(0, 100)}...` 
                              : report.description}
                          </Typography>

                          {/* Info Grid */}
                          <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 2,
                            pt: 2,
                            borderTop: '1px solid #e0e0e0'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CategoryIcon sx={{ fontSize: 18, mr: 1, color: '#757575' }} />
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                {getCategoryLabel(report.category)}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarTodayIcon sx={{ fontSize: 18, mr: 1, color: '#757575' }} />
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                {new Date(report.createdAt).toLocaleDateString('id-ID')}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gridColumn: 'span 2' }}>
                              <LocationOnIcon sx={{ fontSize: 18, mr: 1, color: '#757575' }} />
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                RT {report.rt} / RW {report.rw}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box sx={{ mb: 4 }}>
            {/* Modern Header */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: 'primary.main', 
                  mr: 2, 
                  width: 56, 
                  height: 56,
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                }}>
                  <ReportIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    Pengelolaan Laporan
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                    Kelola laporan dengan mudah dan efisien
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Modern Tabs */}
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
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
                    '&.Mui-selected': {
                      color: 'primary.main',
                    }
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
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
            
            {/* Modern Search and Filter */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 3
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
                        background: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 1)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 1)',
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'primary.main' }} />
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
                        background: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 1)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 1)',
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
                elevation={0}
                sx={{ 
                  p: 6, 
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <CircularProgress size={60} sx={{ color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Memuat laporan...
                </Typography>
              </Paper>
            ) : error ? (
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <Typography color="error" variant="h6">
                  {error}
                </Typography>
              </Paper>
            ) : filterReports().length === 0 ? (
              <Paper 
                elevation={0}
                sx={{ 
                  p: 6, 
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
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
                        elevation={0}
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          cursor: 'pointer',
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            background: 'rgba(255, 255, 255, 1)',
                          }
                        }}
                        onClick={() => handleViewReport(report.id)}
                      >
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          {/* Header with Icon and Status */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <Avatar sx={{ 
                              mr: 2, 
                              bgcolor: 'transparent',
                              fontSize: '1.5rem',
                              width: 48,
                              height: 48,
                              border: '2px solid',
                              borderColor: 'primary.main'
                            }}>
                              {getCategoryIcon(report.category)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography 
                                variant="h6" 
                                component="h2" 
                                sx={{ 
                                  fontWeight: 600,
                                  color: 'text.primary',
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
                            color="text.secondary" 
                            sx={{ 
                              mb: 3,
                              lineHeight: 1.6,
                              fontSize: '0.95rem'
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
                            borderTop: '1px solid',
                            borderColor: 'divider'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CategoryIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {getCategoryLabel(report.category)}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarTodayIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {new Date(report.createdAt).toLocaleDateString('id-ID')}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gridColumn: 'span 2' }}>
                              <LocationOnIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
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
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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reports Management
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Reports" />
            <Tab label="Pending" />
            <Tab label="Received" />
            <Tab label="In Progress" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search reports..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Filter by Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={filterCategory}
                label="Filter by Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="road_damage">Road Damage</MenuItem>
                <MenuItem value="garbage">Garbage</MenuItem>
                <MenuItem value="flood">Flood</MenuItem>
                <MenuItem value="street_light">Street Light</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : filterReports().length === 0 ? (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6">
              No reports found matching your criteria.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filterReports().map((report) => (
              <Grid item xs={12} md={6} key={report.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                  onClick={() => handleViewReport(report.id)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {report.title}
                      </Typography>
                      <Chip 
                        label={getStatusLabel(report.status)} 
                        color={getStatusColor(report.status)} 
                        size="small" 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {report.description.length > 100 
                        ? `${report.description.substring(0, 100)}...` 
                        : report.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Category: {getCategoryLabel(report.category)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Location: RT {report.rt} / RW {report.rw}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
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
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">My Reports</Typography>
          <Button variant="contained" onClick={() => navigate('/citizen/create-report')}>
            Create New Report
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : reports.length === 0 ? (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6">You haven't submitted any reports yet.</Typography>
            <Button variant="contained" onClick={() => navigate('/citizen/create-report')} sx={{ mt: 2 }}>
              Submit Your First Report
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {reports.map((report) => (
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
                  onClick={() => viewReport(report.id)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{report.title}</Typography>
                      <Chip label={getStatusLabel(report.status)} color={getStatusColor(report.status)} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {report.description.length > 100
                        ? `${report.description.substring(0, 100)}...`
                        : report.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">Category: {report.category}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(report.createdAt).toLocaleDateString()}
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

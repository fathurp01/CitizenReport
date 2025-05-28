import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Alert,
  Card,
  CardMedia,
  Modal,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  // State untuk pemrosesan status
  const [status, setStatus] = useState('');
  const [actionDescription, setActionDescription] = useState('');
  const [updating, setUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${window.location.origin}${imagePath}`;
  };

  const handleOpenPreview = (image) => {
    setPreviewImage(getImageUrl(image));
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (!id) {
          setError('Report ID is missing');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`/api/reports/${id}`);
        setReport(response.data);
        setStatus(response.data.status); // Set status awal
        setLoading(false);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Failed to load report details. Please try again later.');
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleActionDescriptionChange = (event) => {
    setActionDescription(event.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!actionDescription.trim()) {
      setSnackbar({
        open: true,
        message: 'Please provide a description of the action taken',
        severity: 'error'
      });
      return;
    }

    try {
      setUpdating(true);
      
      const updateData = {
        status: status,
        actionDescription: actionDescription
      };
      
      console.log('Sending update data:', updateData);
      
      const response = await axios.put(`/api/reports/${id}/status`, updateData);
      
      // Update local report data
      setReport(response.data);
      
      setActionDescription('');
      setSnackbar({
        open: true,
        message: 'Report status updated successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating report status:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update report status';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setUpdating(false);
    }
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/staff/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Report not found.
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/staff/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {report.title}
          </Typography>
          <Chip 
            label={getStatusLabel(report.status)} 
            color={getStatusColor(report.status)} 
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Category
            </Typography>
            <Typography variant="body1" paragraph>
              {getCategoryLabel(report.category)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Date Submitted
            </Typography>
            <Typography variant="body1" paragraph>
              {new Date(report.createdAt).toLocaleString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {report.description}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Location
            </Typography>
            <Typography variant="body1">
              {report.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              RT {report.rt} / RW {report.rw}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Reporter Information
            </Typography>
            <Typography variant="body1">
              {report.user?.name || 'Anonymous'}
            </Typography>
            {report.user?.phone && (
              <Typography variant="body2">
                Phone: {report.user.phone}
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <Grid container spacing={2}>
              {report.images && report.images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 3
                      }
                    }}
                    onClick={() => handleOpenPreview(image)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={getImageUrl(image)}
                      alt={`Report image ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          {/* Modal untuk preview gambar */}
          <Modal
            open={openPreview}
            onClose={handleClosePreview}
            aria-labelledby="image-preview-modal"
            aria-describedby="preview of report image"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
            }}
          >
            <Box sx={{ 
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 24,
              p: 1
            }}>
              <IconButton
                aria-label="close"
                onClick={handleClosePreview}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.7)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(90vh - 2rem)',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </Box>
          </Modal>
          
          {/* Bagian untuk pemrosesan status */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Process Report
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Action Description"
                  multiline
                  rows={4}
                  value={actionDescription}
                  onChange={handleActionDescriptionChange}
                  placeholder="Describe the action taken or reason for status change"
                  helperText="This will be visible to the citizen who reported the issue"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleUpdateStatus}
                  disabled={updating || status === report.status && !actionDescription}
                  sx={{ mt: 1 }}
                >
                  {updating ? <CircularProgress size={24} /> : 'Update Status'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Bagian untuk menampilkan riwayat tindakan */}
          {report.actions && report.actions.length > 0 && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Action History
              </Typography>
              {report.actions.map((action, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                  <Typography variant="body1">
                    {action.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(action.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Grid>
          )}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/staff/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default ReportDetails;
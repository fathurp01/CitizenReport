import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  Alert,
  Card,
  CardMedia,
  Modal,
  IconButton,
  CircularProgress,
  Button,
  Chip
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

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'road_damage': return 'Road Damage';
      case 'garbage': return 'Garbage';
      case 'flood': return 'Flood';
      case 'street_light': return 'Street Light';
      case 'other': return 'Other';
      default: return 'Unknown';
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http')
      ? imagePath
      : `${window.location.origin}${imagePath}`;
  };

  const handleOpenPreview = (image) => {
    setPreviewImage(getImageUrl(image));
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/reports/${id}`);
      setReport(res.data);
    } catch (err) {
      setError(`Failed to fetch report data: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (!id || id === 'undefined') {
          setError('Invalid report ID');
          setLoading(false);
          return;
        }

        const res = await axios.get(`/api/reports/${id}`);
        setReport(res.data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch report data: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading report details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={handleRetry}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">No report data found.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Report Details
            </Typography>
            <Chip
              label={getStatusLabel(report.status)}
              color={getStatusColor(report.status)}
            />
          </Box>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">{report.title}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Category</Typography>
              <Typography variant="body1">{getCategoryLabel(report.category)}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Reported On</Typography>
              <Typography variant="body1">
                {new Date(report.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Description</Typography>
              <Typography variant="body1" paragraph>{report.description}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Location</Typography>
              <Typography variant="body1">{report.address}</Typography>
              <Typography variant="body2">RT: {report.rt} / RW: {report.rw}</Typography>
            </Grid>

            {report.user && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Reported By</Typography>
                <Typography variant="body1">{report.user.fullName}</Typography>
              </Grid>
            )}
          </Grid>

          {report?.images?.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Images
              </Typography>
              <Grid container spacing={2}>
                {report.images.map((image, index) => (
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
            </>
          )}
        </Paper>

        {/* Tombol kembali */}
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Kembali
        </Button>
      </Container>

      {/* Modal Preview Gambar */}
      <Modal
        open={openPreview}
        onClose={handleClosePreview}
        aria-labelledby="image-preview-modal"
        aria-describedby="preview of report image"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
            outline: 'none',
          }}
        >
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8, bgcolor: 'rgba(255,255,255,0.7)' }}
            onClick={handleClosePreview}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '85vh', display: 'block' }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ReportDetails;

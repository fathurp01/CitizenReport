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
  Snackbar,
  Stack,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import HistoryIcon from '@mui/icons-material/History';
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
          setError('ID Laporan tidak ditemukan');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`/api/reports/${id}`);
        setReport(response.data);
        setStatus(response.data.status); // Set status awal
        setLoading(false);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Gagal memuat detail laporan. Silakan coba lagi nanti.');
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
        message: 'Silakan berikan deskripsi tindakan yang diambil',
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
        message: 'Status laporan berhasil diperbarui',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating report status:', err);
      const errorMessage = err.response?.data?.message || 'Gagal memperbarui status laporan';
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
        return 'Menunggu';
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

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '50vh',
          my: 4 
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            mt: 4,
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          {error}
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/staff/dashboard')}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Kembali ke Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert 
          severity="warning" 
          sx={{ 
            mt: 4,
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          Laporan tidak ditemukan.
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/staff/dashboard')}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Kembali ke Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            {report.title}
          </Typography>
          <Chip 
            label={getStatusLabel(report.status)} 
            color={getStatusColor(report.status)}
            sx={{ 
              fontWeight: 600,
              fontSize: '0.875rem',
              height: 32,
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          />
        </Box>
        
        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CategoryIcon sx={{ fontSize: 20, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {getCategoryLabel(report.category)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ fontSize: 20, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {new Date(report.createdAt).toLocaleDateString('id-ID')}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Description Card */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Deskripsi
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
              {report.description}
            </Typography>
          </Paper>

          {/* Images Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Gambar ({report.images?.length || 0})
            </Typography>
            <Grid container spacing={2}>
              {report.images && report.images.map((image, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      }
                    }}
                    onClick={() => handleOpenPreview(image)}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={getImageUrl(image)}
                      alt={`Gambar laporan ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Process Report Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Proses Laporan
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-select-label" sx={{ fontWeight: 500 }}>Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                    sx={{ 
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.8)'
                      }
                    }}
                  >
                    <MenuItem value="pending">Menunggu</MenuItem>
                    <MenuItem value="received">Diterima</MenuItem>
                    <MenuItem value="in_progress">Sedang Diproses</MenuItem>
                    <MenuItem value="completed">Selesai</MenuItem>
                    <MenuItem value="rejected">Ditolak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Deskripsi Tindakan"
                  multiline
                  rows={4}
                  value={actionDescription}
                  onChange={handleActionDescriptionChange}
                  placeholder="Jelaskan tindakan yang diambil atau alasan perubahan status"
                  helperText="Informasi ini akan terlihat oleh warga yang melaporkan masalah"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(255,255,255,0.8)'
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleUpdateStatus}
                  disabled={updating || status === report.status && !actionDescription}
                  sx={{ 
                    mt: 1,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: 140
                  }}
                >
                  {updating ? <CircularProgress size={24} color="inherit" /> : 'Perbarui Status'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Location Info */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Lokasi
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              {report.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              RT {report.rt} / RW {report.rw}
            </Typography>
          </Paper>

          {/* Reporter Info */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Pelapor
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.light' }}>
                {(report.user?.name || 'A').charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {report.user?.name || 'Anonim'}
                </Typography>
                {report.user?.phone && (
                  <Typography variant="body2" color="text.secondary">
                    {report.user.phone}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>

          {/* Action History */}
          {report.actions && report.actions.length > 0 && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Riwayat Tindakan
                </Typography>
              </Box>
              {report.actions.map((action, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2, 
                    p: 2, 
                    bgcolor: 'grey.50', 
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main'
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>
                    {action.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(action.createdAt).toLocaleString('id-ID')}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>
      
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined"
          onClick={() => navigate('/staff/dashboard')}
          sx={{ 
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2
            }
          }}
        >
          Kembali ke Dashboard
        </Button>
      </Box>
      
      {/* Image Preview Modal */}
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
          borderRadius: 3,
          boxShadow: 24,
          p: 1,
          outline: 'none'
        }}>
          <IconButton
            aria-label="close"
            onClick={handleClosePreview}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.8)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={previewImage}
            alt="Pratinjau"
            style={{
              maxWidth: '100%',
              maxHeight: 'calc(90vh - 2rem)',
              display: 'block',
              margin: '0 auto',
              borderRadius: '8px'
            }}
          />
        </Box>
      </Modal>
      
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
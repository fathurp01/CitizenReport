import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
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
  Chip,
  Stack,
  Avatar,
  Skeleton,
  Fade,
  Backdrop
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  ArrowBack as ArrowBackIcon,
  ZoomIn as ZoomInIcon
} from '@mui/icons-material';
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
      case 'road_damage': return 'Kerusakan Jalan';
      case 'garbage': return 'Sampah';
      case 'flood': return 'Banjir';
      case 'street_light': return 'Lampu Jalan';
      case 'other': return 'Lainnya';
      default: return 'Tidak Diketahui';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'received': return 'Diterima';
      case 'in_progress': return 'Sedang Diproses';
      case 'completed': return 'Selesai';
      case 'rejected': return 'Ditolak';
      default: return 'Tidak Diketahui';
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
      setError(`Gagal memuat data laporan: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (!id || id === 'undefined') {
          setError('ID laporan tidak valid');
          setLoading(false);
          return;
        }

        const res = await axios.get(`/api/reports/${id}`);
        setReport(res.data);
        setError(null);
      } catch (err) {
        setError(`Gagal memuat data laporan: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="rounded" width={100} height={32} />
            </Stack>
            <Divider />
            <Skeleton variant="text" width="60%" height={32} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="text" width="70%" height={24} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="text" width="60%" height={24} />
              </Grid>
            </Grid>
            <Stack spacing={1}>
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Stack>
            <Grid container spacing={2}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>
      </Card>
    </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-message': { fontSize: '1rem' }
              }}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={handleRetry}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Coba Lagi
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        </Card>
      </Box>
    );
  }

  if (!report) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Alert severity="warning" sx={{ borderRadius: 2, fontSize: '1rem' }}>
              Data laporan tidak ditemukan.
            </Alert>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
        {/* Header with Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500
            }}
            variant="outlined"
          >
            Kembali
          </Button>
        </Box>

        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              mb: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/svg%3E")',
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* Header Section */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Box>
                  <Typography 
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    sx={{ mb: 1, lineHeight: 1.2 }}
                  >
                    {report.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                    ID Laporan: #{report.id || 'N/A'}
                  </Typography>
                </Box>
                <Chip
                  label={getStatusLabel(report.status)}
                  color={getStatusColor(report.status)}
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
              </Stack>
            </Box>
          </Paper>
        </Fade>

        {/* Main Content Card */}
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            {/* Info Grid */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <CategoryIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Kategori
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 500, pl: 3.5 }}>
                      {getCategoryLabel(report.category)}
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <CalendarIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Dilaporkan Pada
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 500, pl: 3.5 }}>
                      {new Date(report.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <LocationIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Lokasi
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 500, pl: 3.5 }}>
                      {report.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 3.5, mt: 0.5 }}>
                      RT: {report.rt} / RW: {report.rw}
                    </Typography>
                  </Box>

                  {report.user && (
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <PersonIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                          Dilaporkan Oleh
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ pl: 3.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          {report.user.fullName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {report.user.fullName}
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {/* Description Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Deskripsi
              </Typography>
              <Box 
                sx={{ 
                  p: 3, 
                  bgcolor: 'grey.50', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.primary' }}>
                  {report.description}
                </Typography>
              </Box>
            </Box>

            {/* Images Section */}
            {report?.images?.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Lampiran ({report.images.length} gambar)
                </Typography>
                <Grid container spacing={3}>
                  {report.images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        elevation={2}
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: 3,
                          overflow: 'hidden',
                          position: 'relative',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
                          },
                          '&:hover .zoom-overlay': {
                            opacity: 1
                          }
                        }}
                        onClick={() => handleOpenPreview(image)}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="220"
                            image={getImageUrl(image)}
                            alt={`Gambar laporan ${index + 1}`}
                            sx={{ 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                          <Box
                            className="zoom-overlay"
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              bgcolor: 'rgba(0,0,0,0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0,
                              transition: 'opacity 0.3s ease'
                            }}
                          >
                            <ZoomInIcon sx={{ color: 'white', fontSize: 32 }} />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Card>
      </Box>

      {/* Enhanced Image Preview Modal */}
      <Modal
        open={openPreview}
        onClose={handleClosePreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { bgcolor: 'rgba(0, 0, 0, 0.8)' }
        }}
      >
        <Fade in={openPreview}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '95vw',
              maxHeight: '95vh',
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              p: 1,
              outline: 'none',
              overflow: 'hidden'
            }}
          >
            <IconButton
              sx={{ 
                position: 'absolute', 
                right: 12, 
                top: 12, 
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease',
                zIndex: 1
              }}
              onClick={handleClosePreview}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={previewImage}
              alt="Pratinjau"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '90vh', 
                display: 'block',
                borderRadius: '12px'
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ReportDetails;
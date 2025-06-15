import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  Modal,
  IconButton,
  Card,
  CardMedia,
  Chip,
  Divider,
  LinearProgress,
  Fade,
  Zoom,
  Avatar,
  Stack
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  Check as CheckIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormSkeleton } from '../../components/common/SkeletonLoader';

const categories = [
  { value: 'road_damage', label: 'Kerusakan Jalan', icon: '🛣️', color: '#f44336' },
  { value: 'garbage', label: 'Sampah', icon: '🗑️', color: '#ff9800' },
  { value: 'flood', label: 'Banjir', icon: '🌊', color: '#2196f3' },
  { value: 'street_light', label: 'Lampu Jalan', icon: '💡', color: '#ffeb3b' },
  { value: 'other', label: 'Lainnya', icon: '📝', color: '#9c27b0' }
];

const CreateReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    rt: '',
    rw: '',
    images: []
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [openPreview, setOpenPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map(file => URL.createObjectURL(file));
      setFormData({ ...formData, images: files });
      setPreviewUrls(urls);
      if (errors.images) {
        setErrors({ ...errors, images: '' });
      }
    }
  };

  const handleOpenPreview = (url) => {
    setPreviewImage(url);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Judul harus diisi';
    if (!formData.description) newErrors.description = 'Deskripsi harus diisi';
    if (!formData.category) newErrors.category = 'Kategori harus dipilih';
    if (!formData.address) newErrors.address = 'Alamat harus diisi';
    if (!formData.rt) newErrors.rt = 'RT harus diisi';
    if (!formData.rw) newErrors.rw = 'RW harus diisi';
    if (formData.images.length === 0) newErrors.images = 'Minimal satu gambar diperlukan';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setSubmitError('');

      const reportData = new FormData();
      reportData.append('title', formData.title);
      reportData.append('description', formData.description);
      reportData.append('category', formData.category);
      reportData.append('address', formData.address);
      reportData.append('rt', formData.rt);
      reportData.append('rw', formData.rw);
      formData.images.forEach(image => reportData.append('images', image));

      const response = await axios.post('/api/reports', reportData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate(`/citizen/reports/${response.data.id}`);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Gagal membuat laporan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCategory = () => {
    return categories.find(c => c.value === formData.category);
  };

  const getCompletionPercentage = () => {
    const fields = ['title', 'description', 'category', 'address', 'rt', 'rw'];
    const completed = fields.filter(field => formData[field]).length;
    const hasImages = formData.images.length > 0 ? 1 : 0;
    return Math.round(((completed + hasImages) / (fields.length + 1)) * 100);
  };

  if (loading) return <FormSkeleton />;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Fade in timeout={800}>
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
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <DescriptionIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography 
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Buat Laporan Baru
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Bantu tingkatkan komunitas Anda dengan melaporkan masalah
            </Typography>
            
            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Kelengkapan Form
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {getCompletionPercentage()}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={getCompletionPercentage()}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.8)'
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Fade>

        {/* Form */}
        <Fade in timeout={1000}>
          <Paper 
            elevation={2}
            sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 3
            }}
          >
            {submitError && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
                }}
              >
                {submitError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={4}>
                {/* Basic Information Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#667eea', width: 40, height: 40 }}>
                        <TitleIcon />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Informasi Dasar
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    required 
                    fullWidth 
                    label="Judul Laporan" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    error={!!errors.title} 
                    helperText={errors.title}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    required 
                    fullWidth 
                    label="Deskripsi" 
                    name="description" 
                    multiline 
                    rows={4} 
                    value={formData.description} 
                    onChange={handleChange} 
                    error={!!errors.description} 
                    helperText={errors.description}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!errors.category}>
                    <InputLabel>Kategori</InputLabel>
                    <Select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      label="Kategori"
                      sx={{
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#667eea',
                        },
                      }}
                    >
                      {categories.map((c) => (
                        <MenuItem key={c.value} value={c.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ fontSize: '1.2rem' }}>{c.icon}</Typography>
                            <Typography>{c.label}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {errors.category}
                      </Typography>
                    )}
                  </FormControl>
                  
                  {formData.category && (
                    <Zoom in timeout={300}>
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          icon={<CategoryIcon />}
                          label={getSelectedCategory()?.label}
                          sx={{
                            bgcolor: getSelectedCategory()?.color + '20',
                            color: getSelectedCategory()?.color,
                            fontWeight: 600,
                            '& .MuiChip-icon': {
                              color: getSelectedCategory()?.color
                            }
                          }}
                        />
                      </Box>
                    </Zoom>
                  )}
                </Grid>

                {/* Location Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#764ba2', width: 40, height: 40 }}>
                        <LocationIcon />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Detail Lokasi
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    required 
                    fullWidth 
                    label="Alamat" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    error={!!errors.address} 
                    helperText={errors.address}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#764ba2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#764ba2',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField 
                    required 
                    fullWidth 
                    label="RT" 
                    name="rt" 
                    value={formData.rt} 
                    onChange={handleChange} 
                    error={!!errors.rt} 
                    helperText={errors.rt}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#764ba2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#764ba2',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField 
                    required 
                    fullWidth 
                    label="RW" 
                    name="rw" 
                    value={formData.rw} 
                    onChange={handleChange} 
                    error={!!errors.rw} 
                    helperText={errors.rw}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#764ba2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#764ba2',
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Images Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#ff6b35', width: 40, height: 40 }}>
                        <ImageIcon />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Gambar Pendukung
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{ 
                      py: 3,
                      borderRadius: 3,
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      borderColor: formData.images.length > 0 ? 'success.main' : 'primary.main',
                      color: formData.images.length > 0 ? 'success.main' : 'primary.main',
                      backgroundColor: formData.images.length > 0 ? 'success.main' + '10' : 'primary.main' + '10',
                      '&:hover': {
                        borderColor: formData.images.length > 0 ? 'success.dark' : 'primary.dark',
                        backgroundColor: formData.images.length > 0 ? 'success.main' + '20' : 'primary.main' + '20',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {formData.images.length > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckIcon />
                        <Typography variant="h6">
                          {formData.images.length} gambar terpilih
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="h6">
                        Klik untuk Upload Gambar
                      </Typography>
                    )}
                    <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                  </Button>
                  {errors.images && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      {errors.images}
                    </Typography>
                  )}
                </Grid>

                {previewUrls.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Pratinjau Gambar
                    </Typography>
                    <Grid container spacing={2}>
                      {previewUrls.map((url, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Zoom in timeout={300 + (index * 100)}>
                            <Card 
                              sx={{ 
                                cursor: 'pointer',
                                position: 'relative',
                                borderRadius: 3,
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': { 
                                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                  transform: 'translateY(-8px) scale(1.02)' 
                                }
                              }}
                            >
                              <CardMedia 
                                component="img" 
                                height="120" 
                                image={url} 
                                alt={`Pratinjau ${index + 1}`} 
                                sx={{ objectFit: 'cover' }} 
                              />
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'rgba(0,0,0,0.5)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0,
                                  transition: 'opacity 0.3s',
                                  '&:hover': {
                                    opacity: 1
                                  }
                                }}
                                onClick={() => handleOpenPreview(url)}
                              >
                                <IconButton sx={{ color: 'white' }}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Box>
                            </Card>
                          </Zoom>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {/* Submit Button */}
              <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 2,
                    px: 6,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8, #6a42a0)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                    },
                    '&:disabled': {
                      background: 'linear-gradient(45deg, #ccc, #999)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                      <Typography>Mengirim...</Typography>
                    </Box>
                  ) : (
                    'Kirim Laporan'
                  )}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Image Preview Modal */}
        <Modal open={openPreview} onClose={handleClosePreview}>
          <Fade in={openPreview}>
            <Box sx={{
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
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  right: 8, 
                  top: 8, 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,1)',
                  }
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
                  maxHeight: '85vh', 
                  display: 'block',
                  borderRadius: '12px'
                }} 
              />
            </Box>
          </Fade>
        </Modal>
      </Box>
    );
  };

export default CreateReport;
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
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
  Fade,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormSkeleton } from '../../components/common/SkeletonLoader';

const categories = [
  { value: 'road_damage', label: 'Kerusakan Jalan', icon: '🛣️' },
  { value: 'garbage', label: 'Sampah', icon: '🗑️' },
  { value: 'flood', label: 'Banjir', icon: '🌊' },
  { value: 'street_light', label: 'Lampu Jalan', icon: '💡' },
  { value: 'other', label: 'Lainnya', icon: '📝' }
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
    if (!formData.title) newErrors.title = 'Judul laporan wajib diisi';
    if (!formData.description) newErrors.description = 'Deskripsi wajib diisi';
    if (!formData.category) newErrors.category = 'Kategori wajib dipilih';
    if (!formData.address) newErrors.address = 'Alamat wajib diisi';
    if (!formData.rt) newErrors.rt = 'RT wajib diisi';
    if (!formData.rw) newErrors.rw = 'RW wajib diisi';
    if (formData.images.length === 0) newErrors.images = 'Minimal satu foto wajib diunggah';
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

  if (loading) return <FormSkeleton />;

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 5 },
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Header */}
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Buat Laporan Baru
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                Laporkan masalah di lingkungan Anda untuk mendapatkan penanganan yang tepat
              </Typography>
            </Box>

            {submitError && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: '12px',
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
                }}
              >
                {submitError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                {/* Title */}
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
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea'
                        }
                      }
                    }}
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!errors.category}>
                    <InputLabel>Kategori Laporan</InputLabel>
                    <Select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      label="Kategori Laporan"
                      sx={{
                        borderRadius: '12px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#667eea'
                        }
                      }}
                    >
                      {categories.map((c) => (
                        <MenuItem key={c.value} value={c.value}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <span>{c.icon}</span>
                            <span>{c.label}</span>
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
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField 
                    required 
                    fullWidth 
                    label="Deskripsi Masalah" 
                    name="description" 
                    multiline 
                    rows={4} 
                    value={formData.description} 
                    onChange={handleChange} 
                    error={!!errors.description} 
                    helperText={errors.description}
                    placeholder="Jelaskan masalah yang Anda temukan secara detail..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea'
                        }
                      }
                    }}
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <TextField 
                    required 
                    fullWidth 
                    label="Alamat Lengkap" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    error={!!errors.address} 
                    helperText={errors.address}
                    placeholder="Contoh: Jl. Merdeka No. 123, Kelurahan ABC"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea'
                        }
                      }
                    }}
                  />
                </Grid>

                {/* RT & RW */}
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
                    type="number"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea'
                        }
                      }
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
                    type="number"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea'
                        }
                      }
                    }}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <Box>
                    <Button 
                      variant="outlined" 
                      component="label" 
                      fullWidth 
                      startIcon={<CloudUploadIcon />}
                      sx={{ 
                        mb: 2,
                        py: 2,
                        borderRadius: '12px',
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: formData.images.length > 0 ? '#4caf50' : '#667eea',
                        color: formData.images.length > 0 ? '#4caf50' : '#667eea',
                        '&:hover': {
                          borderColor: formData.images.length > 0 ? '#4caf50' : '#764ba2',
                          backgroundColor: 'rgba(102, 126, 234, 0.04)'
                        }
                      }}
                    >
                      {formData.images.length > 0 ? 
                        `${formData.images.length} foto terpilih` : 
                        'Unggah Foto Bukti'
                      }
                      <input 
                        type="file" 
                        hidden 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageChange} 
                      />
                    </Button>
                    {errors.images && (
                      <Typography variant="caption" color="error">
                        {errors.images}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Image Preview */}
                {previewUrls.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                      Preview Foto
                    </Typography>
                    <Grid container spacing={2}>
                      {previewUrls.map((url, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Card 
                            onClick={() => handleOpenPreview(url)} 
                            sx={{ 
                              cursor: 'pointer',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                                transform: 'translateY(-4px)'
                              }
                            }}
                          >
                            <CardMedia 
                              component="img" 
                              height="120" 
                              image={url} 
                              alt={`Preview ${index + 1}`} 
                              sx={{ objectFit: 'cover' }} 
                            />
                            <Box 
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                borderRadius: '50%',
                                p: 0.5
                              }}
                            >
                              <PhotoCameraIcon sx={{ color: 'white', fontSize: 16 }} />
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {/* Submit Button */}
              <Box mt={4}>
                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  disabled={loading}
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                      transform: 'translateY(-2px)'
                    },
                    '&:disabled': {
                      background: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)'
                    }
                  }}
                >
                  {loading ? 'Mengirim Laporan...' : 'Kirim Laporan'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Preview Modal */}
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
              borderRadius: '16px',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
              p: 1, 
              outline: 'none'
            }}>
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  right: 8, 
                  top: 8, 
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.9)'
                  }
                }} 
                onClick={handleClosePreview}
              >
                <CloseIcon />
              </IconButton>
              <img 
                src={previewImage} 
                alt="Preview" 
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
      </Container>
    </Box>
  );
};

export default CreateReport;

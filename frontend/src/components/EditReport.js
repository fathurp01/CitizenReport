import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardMedia,
  IconButton,
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    rt: '',
    rw: ''
  });
  
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'road_damage', label: 'Kerusakan Jalan' },
    { value: 'garbage', label: 'Sampah' },
    { value: 'flood', label: 'Banjir' },
    { value: 'street_light', label: 'Lampu Jalan' },
    { value: 'other', label: 'Lainnya' }
  ];

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/reports/${id}`);
      const report = response.data;
      // Check if report can be edited (only pending reports)
      if (report.status !== 'pending') {
        setError('Laporan tidak dapat diedit karena sudah diproses');
        return;
      }

      setFormData({
        title: report.title,
        description: report.description,
        category: report.category,
        address: report.address,
        rt: report.rt,
        rw: report.rw
      });
      
      setExistingImages(report.images || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError(`Gagal memuat laporan: ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newImages.length > 5) {
      setError('Maksimal 5 gambar yang dapat diunggah');
      return;
    }

    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setError('Hanya file gambar (JPEG, JPG, PNG, GIF) yang diizinkan');
        return false;
      }
      
      if (file.size > maxSize) {
        setError('Ukuran file maksimal 5MB');
        return false;
      }
      
      return true;
    });

    setNewImages(prev => [...prev, ...validFiles]);
    setError('');
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Add new images
      newImages.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await axios.put(`/api/reports/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Laporan berhasil diperbarui');
      setTimeout(() => {
        navigate('/citizen/dashboard');
      }, 2000);

    } catch (err) {
      console.error('Error updating report:', err);
      setError(`Gagal memperbarui laporan: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // if (loading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
  //       <CircularProgress size={60} />
  //     </Box>
  //   );
  // }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate('/citizen/dashboard')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Edit Laporan
          </Typography>
        </Box>

        {/* Error/Success Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Judul Laporan"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Kategori</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Kategori"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Address */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Alamat"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* RT/RW */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="RT"
                name="rt"
                value={formData.rt}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="RW"
                name="rw"
                value={formData.rw}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Gambar Saat Ini
                </Typography>
                <Grid container spacing={2}>
                  {existingImages.map((image, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="120"
                          image={image}
                          alt={`Existing image ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Catatan: Gambar lama akan diganti jika Anda mengunggah gambar baru
                </Typography>
              </Grid>
            )}

            {/* New Images Upload */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Unggah Gambar Baru (Opsional)
              </Typography>
              
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Pilih Gambar
                </Button>
              </label>

              {/* New Images Preview */}
              {newImages.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {newImages.map((file, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <Card sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={URL.createObjectURL(file)}
                          alt={`New image ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => removeNewImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Chip
                          label={file.name}
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 4,
                            left: 4,
                            maxWidth: 'calc(100% - 16px)',
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            '& .MuiChip-label': {
                              fontSize: '0.7rem',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
              
              <Typography variant="caption" color="text.secondary">
                Maksimal 5 gambar, setiap gambar maksimal 5MB (JPEG, JPG, PNG, GIF)
              </Typography>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/citizen/dashboard')}
                  disabled={submitting}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditReport;
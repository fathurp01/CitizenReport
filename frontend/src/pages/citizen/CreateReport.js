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
  CardMedia
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { value: 'road_damage', label: 'Road Damage' },
  { value: 'garbage', label: 'Garbage' },
  { value: 'flood', label: 'Flood' },
  { value: 'street_light', label: 'Street Light' },
  { value: 'other', label: 'Other' }
];

const CreateReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    rt: '',
    rw: '',
    images: [] // Array of File
  });
  const [previewUrls, setPreviewUrls] = useState([]); // URL.createObjectURL
  const [previewImage, setPreviewImage] = useState('');
  const [openPreview, setOpenPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.rt) newErrors.rt = 'RT is required';
    if (!formData.rw) newErrors.rw = 'RW is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

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
      setSubmitError(err.response?.data?.message || 'Failed to create report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create New Report
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required fullWidth id="title" label="Title" name="title"
                value={formData.title} onChange={handleChange}
                error={!!errors.title} helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth id="description" label="Description"
                name="description" multiline rows={4}
                value={formData.description} onChange={handleChange}
                error={!!errors.description} helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label" id="category" name="category"
                  value={formData.category} label="Category"
                  onChange={handleChange}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">{errors.category}</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth id="address" label="Address" name="address"
                value={formData.address} onChange={handleChange}
                error={!!errors.address} helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required fullWidth id="rt" label="RT" name="rt"
                value={formData.rt} onChange={handleChange}
                error={!!errors.rt} helperText={errors.rt}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required fullWidth id="rw" label="RW" name="rw"
                value={formData.rw} onChange={handleChange}
                error={!!errors.rw} helperText={errors.rw}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth sx={{ mb: 1 }}>
                Upload Images
                <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
              </Button>
              {formData.images.length > 0 && (
                <Typography variant="body2">
                  {formData.images.length} image{formData.images.length > 1 && 's'} selected
                </Typography>
              )}
              {errors.images && (
                <Typography variant="caption" color="error">{errors.images}</Typography>
              )}
            </Grid>

            {/* Thumbnail Image Preview */}
            {previewUrls.length > 0 && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {previewUrls.map((url, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card
                        onClick={() => handleOpenPreview(url)}
                        sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'scale(1.02)' } }}
                      >
                        <CardMedia
                          component="img"
                          height="120"
                          image={url}
                          alt={`Preview ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Button
            type="submit" fullWidth variant="contained" disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Report'}
          </Button>
        </Box>
      </Paper>

      {/* Modal Image Preview */}
      <Modal
        open={openPreview}
        onClose={handleClosePreview}
        aria-labelledby="image-preview-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90vw', maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24, p: 1, outline: 'none'
        }}>
          <IconButton
            sx={{
              position: 'absolute', right: 8, top: 8,
              bgcolor: 'rgba(255,255,255,0.7)'
            }}
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
    </Container>
  );
};

export default CreateReport;

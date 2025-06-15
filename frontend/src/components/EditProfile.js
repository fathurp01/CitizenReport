import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Alert,
  Snackbar,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Backdrop,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Visibility,
  VisibilityOff,
  Lock,
  VpnKey,
  Badge,
  Work,
  CalendarToday,
  Wc
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  
  // States
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: '',
    occupation: '',
    avatar: null
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      const userData = {
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        birthDate: user.birthDate || '',
        gender: user.gender || '',
        occupation: user.occupation || '',
        avatar: user.avatar || null
      };
      setFormData(userData);
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  // Event Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showNotification('Ukuran file maksimal 2MB', 'error');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        showNotification('File harus berupa gambar', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({ ...prev, avatar: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Validation Functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    return newErrors;
  };

  const validatePasswordChange = () => {
    const newErrors = {};

    if (passwords.newPassword) {
      if (!passwords.currentPassword) {
        newErrors.currentPassword = 'Password lama wajib diisi';
      }

      if (passwords.newPassword.length < 6) {
        newErrors.newPassword = 'Password baru minimal 6 karakter';
      }

      if (passwords.newPassword !== passwords.confirmPassword) {
        newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
      }

      if (passwords.currentPassword === passwords.newPassword) {
        newErrors.newPassword = 'Password baru harus berbeda dari password lama';
      }
    }

    return newErrors;
  };

  // Utility Functions
  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const resetForm = () => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        birthDate: user.birthDate || '',
        gender: user.gender || '',
        occupation: user.occupation || '',
        avatar: user.avatar || null
      });
      setAvatarPreview(user.avatar);
    }
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
  };

  const getRoleConfig = () => {
    const configs = {
      admin: { label: 'Administrator', color: 'error', icon: Badge },
      village_staff: { label: 'Pegawai Desa', color: 'primary', icon: Badge },
      default: { label: 'Warga', color: 'success', icon: Badge }
    };
    return configs[user?.role] || configs.default;
  };

  // Main Actions
  const handleSave = async () => {
    const formErrors = validateForm();
    const passwordErrors = validatePasswordChange();
    const allErrors = { ...formErrors, ...passwordErrors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updateData = { ...formData };
      
      // Include password if changing
      if (passwords.newPassword) {
        updateData.password = passwords.newPassword;
      }

      await updateProfile(updateData);
      
      setIsEditing(false);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showNotification('Profil berhasil diperbarui!');
      
    } catch (error) {
      console.error('Profile update error:', error);
      showNotification('Gagal memperbarui profil. Silakan coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const roleConfig = getRoleConfig();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
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
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Badge sx={{ fontSize: '2rem' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Edit Profile
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Kelola informasi profil dan keamanan akun Anda
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Profile Card */}
        <Grid item xs={12} lg={8}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* Card Header */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'stretch', sm: 'center' }}
                spacing={2}
                mb={3}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Person sx={{ color: 'primary.main' }} />
                  <Typography variant="h5" fontWeight="bold">
                    Informasi Pribadi
                  </Typography>
                </Stack>
                <Button
                  variant={isEditing ? "outlined" : "contained"}
                  color="primary"
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                  disabled={loading}
                  size="medium"
                  sx={{
                    background: isEditing ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderColor: isEditing ? '#667eea' : 'transparent',
                    color: isEditing ? '#667eea' : 'white',
                    '&:hover': {
                      background: isEditing ? 'rgba(102, 126, 234, 0.08)' : 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      borderColor: isEditing ? '#5a6fd8' : 'transparent',
                    },
                    '&:disabled': {
                      background: isEditing ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      opacity: 0.6
                    }
                  }}
                >
                  {isEditing ? 'Batal' : 'Edit Profil'}
                </Button>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Avatar Section */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                alignItems="center" 
                spacing={3} 
                mb={4}
              >
                <Avatar
                  src={avatarPreview}
                  sx={{ 
                    width: { xs: 80, sm: 100 }, 
                    height: { xs: 80, sm: 100 },
                    border: '4px solid',
                    borderColor: 'primary.light',
                    fontSize: '2rem'
                  }}
                >
                  {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                
                {isEditing && (
                  <Stack spacing={1}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<PhotoCamera />}
                        size="small"
                      >
                        Ubah Foto
                      </Button>
                    </label>
                    <Typography variant="caption" color="text.secondary" textAlign="center">
                      Max 2MB, JPG/PNG
                    </Typography>
                  </Stack>
                )}
              </Stack>

              {/* Form Fields */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nomor Telepon"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tanggal Lahir"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Jenis Kelamin</InputLabel>
                    <Select
                      label="Jenis Kelamin"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Wc color="action" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="male">Laki-laki</MenuItem>
                      <MenuItem value="female">Perempuan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pekerjaan"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Work color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Alamat"
                    name="address"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <LocationOn color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              {isEditing && (
                <Stack 
                  direction="row" 
                  spacing={2} 
                  justifyContent="flex-end" 
                  mt={4}
                >
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={loading}
                    startIcon={<Cancel />}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    startIcon={<Save />}
                  >
                    Simpan Perubahan
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Role Status Card */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body1" fontWeight="medium" color="text.primary">
                    Status:
                  </Typography>
                  <Chip
                    label={roleConfig.label}
                    color={roleConfig.color}
                    size="medium"
                    icon={<roleConfig.icon />}
                    sx={{
                      fontWeight: 'bold',
                      '& .MuiChip-icon': {
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Password Change Card */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                  <Lock sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Ubah Password
                  </Typography>
                </Stack>
                
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Password Lama"
                    name="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKey color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility('current')}
                            edge="end"
                          >
                            {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password Baru"
                    name="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility('new')}
                            edge="end"
                          >
                            {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Konfirmasi Password Baru"
                    name="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility('confirm')}
                            edge="end"
                          >
                            {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Alert severity="info" sx={{ mt: 1 }}>
                    Password baru minimal 6 karakter dan harus berbeda dari password lama.
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfile;
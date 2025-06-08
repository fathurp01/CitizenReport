import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Fade,
  Paper,
  Divider
} from '@mui/material';
import { PhotoCamera, Save, Cancel, Edit, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.fullName || user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || user?.phone || '',
    address: user?.address || ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (profileImage) {
        formDataToSend.append('profilePicture', profileImage);
      }

      await updateProfile(formDataToSend);
      setMessage('Profil berhasil diperbarui!');
      setEditing(false);
      setProfileImage(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.fullName || user?.name || '',
      email: user?.email || '',
      phone: user?.phoneNumber || user?.phone || '',
      address: user?.address || ''
    });
    setPreviewImage(user?.profilePicture || null);
    setProfileImage(null);
    setEditing(false);
    setError('');
    setMessage('');
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <Box 
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 4,
                textAlign: 'center',
                color: 'white'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Profil Saya
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{
                  opacity: 0.9
                }}
              >
                Kelola informasi profil dan pengaturan akun Anda
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {message && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px'
                  }}
                >
                  {message}
                </Alert>
              )}
              
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px'
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Profile Picture Section */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={previewImage}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: '4px solid #667eea',
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    {(user?.fullName || user?.name)?.charAt(0) || <Person sx={{ fontSize: 60 }} />}
                  </Avatar>
                  
                  {editing && (
                    <IconButton
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: -8,
                        backgroundColor: '#667eea',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#5a6fd8'
                        }
                      }}
                    >
                      <PhotoCamera />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </IconButton>
                  )}
                </Box>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#667eea',
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  {user?.fullName || user?.name || 'Nama Pengguna'}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ color: 'text.secondary' }}
                >
                  {user?.role === 'village_staff' ? 'Petugas Desa' : 
                   user?.role === 'admin' ? 'Administrator' : 'Warga'}
                </Typography>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nama Lengkap"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editing}
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
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editing}
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
                      fullWidth
                      label="Nomor Telepon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!editing}
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
                      fullWidth
                      label="Alamat"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!editing}
                      multiline
                      rows={2}
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
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {!editing ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => setEditing(true)}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
                        }
                      }}
                    >
                      Edit Profil
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        disabled={loading}
                        sx={{
                          borderRadius: '12px',
                          px: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderColor: '#667eea',
                          color: '#667eea',
                          '&:hover': {
                            borderColor: '#5a6fd8',
                            backgroundColor: 'rgba(102, 126, 234, 0.04)'
                          }
                        }}
                      >
                        Batal
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '12px',
                          px: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                          '&:hover': {
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
                          }
                        }}
                      >
                        {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Profile;
import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Container,
  Avatar,
  IconButton,
  InputAdornment,
  Fade,
  Divider
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import TitleIcon from '@mui/icons-material/Title';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const res = await fetch('/api/articles', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Artikel berhasil ditambahkan!');
      setTitle('');
      setAuthor('');
      setContent('');
      setImage(null);
    } else {
      alert('Gagal menambahkan artikel');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      py: 4
    }}>
      <Container maxWidth="md">
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 4, 
              borderRadius: 2,
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0'
            }}
          >
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              textAlign: 'center',
              justifyContent: 'center'
            }}>
              <Avatar sx={{ 
                bgcolor: '#1565c0',
                mr: 2, 
                width: 56, 
                height: 56
              }}>
                <ArticleIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ 
                    fontWeight: 600,
                    color: '#1a1a1a',
                    mb: 1
                  }}
                >
                  Tambah Artikel
                </Typography>
                <Typography variant="body1" color="#666666" sx={{ fontWeight: 400 }}>
                  Buat artikel baru dengan mudah dan cepat
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4, borderColor: '#e0e0e0' }} />

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Judul Artikel"
                  placeholder="Masukkan judul artikel yang menarik..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      color: '#424242'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#1565c0'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon sx={{ color: '#1565c0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Penulis"
                  placeholder="Nama penulis artikel..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      color: '#424242'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#1565c0'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#1565c0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Konten Artikel"
                  placeholder="Tulis konten artikel Anda di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={6}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      color: '#424242'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#1565c0'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                        <CreateIcon sx={{ color: '#1565c0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* File Upload Section */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600,
                    color: '#424242',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ImageIcon sx={{ mr: 1, color: '#1565c0' }} />
                  Gambar Artikel (Opsional)
                </Typography>
                
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    backgroundColor: '#f5f5f5',
                    border: '2px dashed #bdbdbd',
                    borderColor: image ? '#4caf50' : '#bdbdbd',
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#eeeeee',
                      borderColor: image ? '#4caf50' : '#1565c0'
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    <CloudUploadIcon 
                      sx={{ 
                        fontSize: 48, 
                        color: image ? '#4caf50' : '#757575',
                        mb: 2
                      }} 
                    />
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
                      {image ? `File terpilih: ${image.name}` : 'Klik untuk memilih gambar'}
                    </Typography>
                    <Typography variant="body2" color="#757575">
                      Format: JPG, PNG, GIF (Max: 5MB)
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                  </Box>
                </Paper>
              </Box>

              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  startIcon={<SaveIcon />}
                  sx={{ 
                    px: 6,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    backgroundColor: '#1565c0',
                    '&:hover': {
                      backgroundColor: '#0d47a1'
                    }
                  }}
                >
                  Simpan Artikel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default ArticleForm;
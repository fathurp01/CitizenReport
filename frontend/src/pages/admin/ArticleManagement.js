import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit, Delete, Check, Close } from '@mui/icons-material';
import axios from 'axios';

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles');
      setArticles(res.data);
    } catch (err) {
      setError('Gagal mengambil artikel');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        await axios.delete(`/api/articles/${id}`);
        setArticles(articles.filter(a => a.id !== id));
      } catch (err) {
        setError('Gagal menghapus artikel');
      }
    }
  };

  const handleApprove = async (id, status) => {
    try {
      await axios.put(`/api/articles/${id}/status`, { status });
      setArticles(articles.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      setError('Gagal mengubah status artikel');
    }
  };

  const openEditDialog = (article) => {
    setSelectedArticle(article);
    setEditedTitle(article.title);
    setEditedContent(article.content);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/articles/${selectedArticle.id}`, {
        title: editedTitle,
        content: editedContent
      });
      setArticles(articles.map(a => a.id === selectedArticle.id ? { ...a, title: editedTitle, content: editedContent } : a));
      closeEditDialog();
    } catch (err) {
      setError('Gagal mengedit artikel');
    }
  };

  const closeEditDialog = () => {
    setSelectedArticle(null);
    setEditedTitle('');
    setEditedContent('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress sx={{ color: 'white' }} size={60} />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Kelola Artikel
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {articles.map(article => (
            <Grid item xs={12} md={6} key={article.id}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    zIndex: 2
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}
                  >
                    {article.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                  >
                    Oleh: {article.author}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.content.slice(0, 100)}...
                  </Typography>
                  
                  <Chip 
                    label={article.status} 
                    color={getStatusColor(article.status)}
                    sx={{ mb: 2 }}
                  />
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => openEditDialog(article)}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          background: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      Edit
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Check />}
                      onClick={() => handleApprove(article.id, 'approved')}
                      sx={{
                        borderColor: '#10B981',
                        color: '#10B981',
                        '&:hover': {
                          borderColor: '#059669',
                          background: 'rgba(16, 185, 129, 0.1)'
                        }
                      }}
                    >
                      Setujui
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Close />}
                      onClick={() => handleApprove(article.id, 'rejected')}
                      sx={{
                        borderColor: '#F59E0B',
                        color: '#F59E0B',
                        '&:hover': {
                          borderColor: '#D97706',
                          background: 'rgba(245, 158, 11, 0.1)'
                        }
                      }}
                    >
                      Tolak
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(article.id)}
                      sx={{
                        borderColor: '#EF4444',
                        color: '#EF4444',
                        '&:hover': {
                          borderColor: '#DC2626',
                          background: 'rgba(239, 68, 68, 0.1)'
                        }
                      }}
                    >
                      Hapus
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog Edit */}
        <Dialog 
          open={!!selectedArticle} 
          onClose={closeEditDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3
            }
          }}
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            Edit Artikel
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Judul"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Konten"
              multiline
              rows={6}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={closeEditDialog} color="inherit">
              Batal
            </Button>
            <Button 
              onClick={handleEdit} 
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                }
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ArticleManagement;

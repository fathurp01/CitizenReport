import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Fade,
  Paper
} from '@mui/material';
import { Close, Person, CalendarToday, Article } from '@mui/icons-material';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('/api/articles');
        const approved = res.data.filter(article => article.status === 'approved');
        setArticles(approved);
      } catch (err) {
        setError('Gagal mengambil artikel.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const closeModal = () => {
    setSelectedArticle(null);
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

  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}
      >
        <Paper 
          sx={{ 
            p: 4,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <Typography variant="h6" color="error">{error}</Typography>
        </Paper>
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
        <Fade in timeout={800}>
          <Box>
            {/* Header */}
            <Box textAlign="center" mb={5}>
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                Artikel Untuk Warga
              </Typography>
              <Typography 
                variant="h6" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontSize: '1.1rem'
                }}
              >
                Temukan informasi terkini dan bermanfaat untuk kehidupan sehari-hari
              </Typography>
            </Box>

            {/* Articles Grid */}
            {articles.length === 0 ? (
              <Paper 
                sx={{ 
                  p: 6,
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)'
                }}
              >
                <Article sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#667eea',
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  Belum Ada Artikel
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: 'text.secondary' }}
                >
                  Artikel akan segera tersedia untuk Anda
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {articles.map((article) => (
                  <Grid item xs={12} sm={6} md={4} key={article.id}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 16px 48px rgba(102, 126, 234, 0.25)'
                        }
                      }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      {article.image && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={`/uploads/${article.image}`}
                          alt={article.title}
                          sx={{
                            objectFit: 'cover'
                          }}
                        />
                      )}
                      
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: '#667eea',
                            fontWeight: 'bold',
                            mb: 2,
                            lineHeight: 1.3
                          }}
                        >
                          {article.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            mb: 3,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.6
                          }}
                        >
                          {article.content}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Person sx={{ fontSize: 16, color: 'text.disabled' }} />
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                              {article.author?.name || 'Admin'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 16, color: 'text.disabled' }} />
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                              {new Date(article.createdAt).toLocaleDateString('id-ID')}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>

        {/* Article Detail Modal */}
        <Dialog 
          open={!!selectedArticle} 
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)'
            }
          }}
        >
          {selectedArticle && (
            <>
              <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pb: 2
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#667eea',
                    fontWeight: 'bold'
                  }}
                >
                  {selectedArticle.title}
                </Typography>
                <IconButton onClick={closeModal}>
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                {selectedArticle.image && (
                  <Box sx={{ mb: 3 }}>
                    <img 
                      src={`/uploads/${selectedArticle.image}`} 
                      alt={selectedArticle.title}
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '12px'
                      }}
                    />
                  </Box>
                )}
                
                <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Chip 
                    icon={<Person />} 
                    label={selectedArticle.author?.name || 'Admin'} 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<CalendarToday />} 
                    label={new Date(selectedArticle.createdAt).toLocaleDateString('id-ID')} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.8,
                    color: 'text.primary',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {selectedArticle.content}
                </Typography>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default ArticleList;

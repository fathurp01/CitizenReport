import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Fade, Zoom, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { keyframes } from '@mui/system';

// Animations consistent with other pages
const pulse = keyframes`
  0% { transform: scale(1) rotate(0deg); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { transform: scale(1.08) rotate(180deg); box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
  100% { transform: scale(1) rotate(360deg); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  50% { transform: translateY(-5px) rotate(-5deg); }
  75% { transform: translateY(-15px) rotate(3deg); }
`;

const NotFound = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        overscrollBehavior: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)',
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 15s ease infinite`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 0%, transparent 30%)
          `,
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Zoom in={isVisible} timeout={1000}>
          <Box
            sx={{
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              backdropFilter: 'blur(25px) saturate(200%)',
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.12),
                0 32px 64px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.6)
              `,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              p: 4,
              textAlign: 'center',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.005)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.15),
                  0 40px 72px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8)
                `
              }
            }}
          >
            {/* Error Icon */}
            <Slide direction="down" in={isVisible} timeout={800}>
              <Box sx={{ mb: 3 }}>
                <ErrorOutlineIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: '#6366f1',
                    animation: `${float} 6s ease-in-out infinite`,
                    filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))'
                  }} 
                />
              </Box>
            </Slide>

            {/* 404 Text */}
            <Fade in={isVisible} timeout={1200}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{
                  fontSize: { xs: '4rem', sm: '6rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 8px rgba(99, 102, 241, 0.2)',
                  mb: 2,
                  letterSpacing: '-0.02em'
                }}
              >
                404
              </Typography>
            </Fade>

            {/* Page Not Found */}
            <Slide direction="up" in={isVisible} timeout={1000}>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 600,
                  color: '#374151',
                  mb: 2,
                  letterSpacing: '0.5px'
                }}
              >
                Halaman Tidak Ditemukan
              </Typography>
            </Slide>

            {/* Description */}
            <Fade in={isVisible} timeout={1400}>
              <Typography 
                variant="body1" 
                sx={{
                  fontSize: '1.1rem',
                  color: '#6b7280',
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: '400px',
                  mx: 'auto'
                }}
              >
                Halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke halaman utama.
              </Typography>
            </Fade>

            {/* Home Button */}
            <Zoom in={isVisible} timeout={1600}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                  backgroundSize: '200% 200%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)',
                  overflow: 'hidden',
                  textTransform: 'none',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transition: 'all 0.7s ease',
                    zIndex: 1
                  },
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 16px 48px rgba(99, 102, 241, 0.45)',
                    backgroundPosition: 'right center'
                  },
                  '&:hover::before': {
                    left: '100%'
                  },
                  '&:active': {
                    transform: 'translateY(0) scale(0.98)'
                  }
                }}
              >
                Kembali ke Beranda
              </Button>
            </Zoom>

            {/* Additional Info */}
            <Fade in={isVisible} timeout={1800}>
              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#9ca3af',
                    fontSize: '0.9rem'
                  }}
                >
                  Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
};

export default NotFound;
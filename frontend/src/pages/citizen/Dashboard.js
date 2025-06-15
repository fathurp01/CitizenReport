import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
  IconButton,
  Paper,
  Fade,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Article as ArticleIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const theme = useTheme();

  const viewReport = (reportId) => {
    if (!reportId) {
      console.error('Invalid report ID');
      return;
    }
    navigate(`/citizen/reports/${reportId}`);
  };

  const editReport = (e, reportId) => {
    e.stopPropagation(); // Mencegah event klik card
    if (!reportId) {
      console.error('Invalid report ID');
      return;
    }
    navigate(`/citizen/edit-report/${reportId}`);
  };

  // Handler untuk buka/tutup dialog
  const openDeleteDialog = (e, report) => {
    e.stopPropagation();               
    setReportToDelete(report);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setReportToDelete(null);
  };

  // Handler delete
  const deleteReport = async (e, report) => {
    e.stopPropagation();  // pastikan event tidak menerus ke parent
    try {
      await axios.delete(`/api/reports/${report.id}`);
      setReports(rs => rs.filter(r => r.id !== report.id));
      setSnackbar({
        open: true,
        message: 'Laporan berhasil dihapus',
        severity: 'success'
      });
      closeDeleteDialog();
    } catch (err) {
      console.error('Error deleting report:', err);
      setSnackbar({
        open: true,
        message: `Gagal menghapus laporan: ${err.response?.data?.message || err.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to check if report can be edited/deleted (only pending status)
  const canEditOrDelete = (status) => {
    return status === 'pending';
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports/my-reports');
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(`Gagal memuat laporan: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'default';
      case 'received': return 'primary';
      case 'in_progress': return 'warning';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'received': return 'Diterima';
      case 'in_progress': return 'Dalam Proses';
      case 'completed': return 'Selesai';
      case 'rejected': return 'Ditolak';
      default: return 'Tidak Diketahui';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ScheduleIcon fontSize="small" />;
      case 'received': return <ArticleIcon fontSize="small" />;
      case 'in_progress': return <TrendingUpIcon fontSize="small" />;
      case 'completed': return <CheckCircleIcon fontSize="small" />;
      case 'rejected': return <ErrorIcon fontSize="small" />;
      default: return <ArticleIcon fontSize="small" />;
    }
  };

  const getStatusStats = () => {
    const stats = {
      total: reports.length,
      pending: reports.filter(r => r.status === 'pending').length,
      in_progress: reports.filter(r => r.status === 'in_progress').length,
      completed: reports.filter(r => r.status === 'completed').length,
      rejected: reports.filter(r => r.status === 'rejected').length
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography 
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Laporan Saya
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Kelola dan lacak laporan yang telah Anda kirimkan
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/citizen/create-report')}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  px: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Buat Laporan Baru
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Stats Cards */}
        {!loading && !error && reports.length > 0 && (
          <Fade in timeout={800}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { label: 'Total Laporan', value: stats.total, color: '#667eea', icon: <ArticleIcon /> },
                { label: 'Menunggu', value: stats.pending, color: '#ffa726', icon: <ScheduleIcon /> },
                { label: 'Dalam Proses', value: stats.in_progress, color: '#42a5f5', icon: <TrendingUpIcon /> },
                { label: 'Selesai', value: stats.completed, color: '#66bb6a', icon: <CheckCircleIcon /> }
              ].map((stat, index) => (
                <Grid item xs={6} md={3} key={stat.label}>
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 3,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: stat.color,
                          width: 56,
                          height: 56,
                          mx: 'auto',
                          mb: 2,
                          boxShadow: `0 8px 32px ${stat.color}40`
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}

        {/* Content Section */}
        <Paper 
          elevation={2}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress 
                  size={60}
                  sx={{
                    color: '#667eea',
                    mb: 2
                  }}
                />
                <Typography variant="h6" color="text.secondary">
                  Memuat laporan Anda...
                </Typography>
              </Box>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar
                sx={{
                  bgcolor: 'error.main',
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3
                }}
              >
                <ErrorIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                Terjadi kesalahan
              </Typography>
              <Typography color="text.secondary">
                {error}
              </Typography>
            </Box>
          ) : reports.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 3
                }}
              >
                <ArticleIcon sx={{ fontSize: 50 }} />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Belum ada laporan
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                Anda belum mengirimkan laporan apapun. Mulailah dengan membuat laporan pertama Anda untuk melacak masalah di komunitas Anda.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/citizen/create-report')} 
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  px: 4,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8, #6a42a0)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Kirim Laporan Pertama Anda
              </Button>
            </Box>
          ) : (
            <Box sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {reports.map((report, index) => (
                  <Grid item xs={12} md={6} key={report.id}>
                    <Fade in timeout={600 + (index * 100)}>
                      <Card
                        elevation={2}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          borderRadius: 3,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          }
                        }}
                        onClick={() => viewReport(report.id)}
                      >
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600,
                                flex: 1,
                                mr: 2,
                                lineHeight: 1.3
                              }}
                            >
                              {report.title}
                            </Typography>
                            <Chip 
                              icon={getStatusIcon(report.status)}
                              label={getStatusLabel(report.status)} 
                              color={getStatusColor(report.status)} 
                              size="small"
                              sx={{
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                  fontSize: '16px'
                                }
                              }}
                            />
                          </Box>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 3,
                              lineHeight: 1.6,
                              minHeight: '3em'
                            }}
                          >
                            {report.description.length > 100
                              ? `${report.description.substring(0, 100)}...`
                              : report.description}
                          </Typography>
                          
                          <Divider sx={{ mb: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  display: 'block',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5
                                }}
                              >
                                Kategori
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {report.category}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  display: 'block',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5
                                }}
                              >
                                Dibuat
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {new Date(report.createdAt).toLocaleDateString('id-ID')}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            {/* Tombol View - selalu tampil */}
                            <IconButton
                              size="small"
                              sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'primary.dark',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            
                            {/* Tombol Edit - hanya tampil jika status pending */}
                            {canEditOrDelete(report.status) && (
                              <IconButton
                                size="small"
                                onClick={(e) => editReport(e, report.id)}
                                sx={{
                                  bgcolor: 'warning.main',
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: 'warning.dark',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s'
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            )}
                            
                            {/* Tombol Delete - hanya tampil jika status pending */}
                            {canEditOrDelete(report.status) && (
                              <IconButton
                                size="small"
                                onClick={(e) => openDeleteDialog(e, report)}
                                sx={{
                                  bgcolor: 'error.main',
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: 'error.dark',
                                    transform: 'scale(1.1)',
                                  },
                                  transition: 'all 0.2s',
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Dialog konfirmasi delete */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={closeDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Hapus Laporan?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
            Apakah Anda yakin ingin menghapus laporan <strong>"{reportToDelete?.title}"</strong>? 
            Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={closeDeleteDialog}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 3
            }}
          >
            Batal
          </Button>
          <Button
            onClick={(e) => deleteReport(e, reportToDelete)}
            variant="contained"
            color="error"
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              ml: 2
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar untuk notifikasi */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
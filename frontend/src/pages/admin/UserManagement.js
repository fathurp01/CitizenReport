import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, IconButton, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, TablePagination,
  Chip, Card, CardContent, Avatar, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkIcon from '@mui/icons-material/Work';
import axios from 'axios';
import { TableSkeleton } from '../../components/common/SkeletonLoader';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phoneNumber: '',
    role: '', address: '', rt: '', rw: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false, message: '', severity: 'success'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Gagal memuat pengguna. Silakan coba lagi nanti.');
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({ ...user });
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveUser = async () => {
    try {
      await axios.put(`/api/admin/users/${selectedUser.id}`, formData);
      fetchUsers();
      handleCloseEditDialog();
      setSnackbar({ open: true, message: 'Pengguna berhasil diperbarui', severity: 'success' });
    } catch (err) {
      console.error('Error updating user:', err);
      setSnackbar({ open: true, message: err.response?.data?.message || 'Gagal memperbarui pengguna', severity: 'error' });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/admin/users/${selectedUser.id}`);
      fetchUsers();
      handleCloseDeleteDialog();
      setSnackbar({ open: true, message: 'Pengguna berhasil dihapus', severity: 'success' });
    } catch (err) {
      console.error('Error deleting user:', err);
      setSnackbar({ open: true, message: err.response?.data?.message || 'Gagal menghapus pengguna', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />;
      case 'village_staff': return <WorkIcon sx={{ fontSize: 16 }} />;
      default: return <PersonIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'village_staff': return 'warning';
      default: return 'primary';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'citizen': return 'Warga';
      case 'village_staff': return 'Staf Desa';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  if (loading) return <TableSkeleton />;
  if (error) {
    return (
      <Container maxWidth="lg">
        <Card sx={{ mt: 4, textAlign: 'center', py: 4 }}>
          <CardContent>
            <Typography color="error" variant="h6">Gagal memuat data pengguna. Silakan coba lagi nanti.</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Kelola Pengguna
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Kelola dan pantau semua pengguna dalam sistem
            </Typography>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Card sx={{ flex: 1, minWidth: 200, background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Pengguna</Typography>
              <Typography variant="h4">{users.length}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 200, background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Warga</Typography>
              <Typography variant="h4">{users.filter(u => u.role === 'citizen').length}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 200, background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Staf</Typography>
              <Typography variant="h4">{users.filter(u => u.role === 'village_staff').length}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Main Table */}
        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    Pengguna
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    Kontak
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    Peran
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    Alamat
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    RT
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    RW
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    backgroundColor: '#f8f9fa', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #e9ecef',
                    fontSize: '0.95rem'
                  }}>
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    hover 
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: '#f8f9ff',
                        transform: 'scale(1.001)',
                        transition: 'all 0.2s ease-in-out'
                      },
                      borderBottom: index === users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length - 1 ? 'none' : '1px solid #f1f3f4'
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          width: 40, 
                          height: 40, 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          fontSize: '1rem',
                          fontWeight: 'bold'
                        }}>
                          {user.fullName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2d3748' }}>
                            {user.fullName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#718096' }}>
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#4a5568' }}>
                        {user.phoneNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={getRoleIcon(user.role)}
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role)}
                        variant="outlined"
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: 2,
                          '& .MuiChip-icon': { ml: 1 }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#4a5568', maxWidth: 200 }}>
                        {user.address || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.rt || '-'} 
                        size="small" 
                        variant="outlined" 
                        sx={{ borderRadius: 2, fontSize: '0.75rem', minWidth: 50 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.rw || '-'} 
                        size="small" 
                        variant="outlined" 
                        sx={{ borderRadius: 2, fontSize: '0.75rem', minWidth: 50 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditClick(user)} 
                          size="small"
                          sx={{ 
                            borderRadius: 2, 
                            backgroundColor: '#e3f2fd',
                            '&:hover': { backgroundColor: '#bbdefb', transform: 'scale(1.1)' },
                            transition: 'all 0.2s'
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteClick(user)} 
                          size="small"
                          sx={{ 
                            borderRadius: 2, 
                            backgroundColor: '#ffebee',
                            '&:hover': { backgroundColor: '#ffcdd2', transform: 'scale(1.1)' },
                            transition: 'all 0.2s'
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ 
              backgroundColor: '#fafafa',
              '& .MuiTablePagination-toolbar': { paddingX: 3 }
            }}
          />
        </Card>
      </Box>

      {/* Edit User Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }}>
          Edit Pengguna
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Nama Lengkap" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Nomor Telepon" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
              <InputLabel>Peran</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange} label="Peran">
                <MenuItem value="citizen">Warga</MenuItem>
                <MenuItem value="village_staff">Staf Desa</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Alamat" 
              name="address" 
              value={formData.address} 
              onChange={handleChange}
              sx={{ mb: 2 }}
              variant="outlined"
              multiline
              rows={2}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                fullWidth 
                margin="normal" 
                label="RT" 
                name="rt" 
                value={formData.rt} 
                onChange={handleChange}
                variant="outlined"
              />
              <TextField 
                fullWidth 
                margin="normal" 
                label="RW" 
                name="rw" 
                value={formData.rw} 
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={handleCloseEditDialog}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Batal
          </Button>
          <Button 
            onClick={handleSaveUser} 
            variant="contained"
            sx={{ 
              borderRadius: 2, 
              px: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' }
            }}
          >
            Simpan Perubahan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
        }}
      >
        <DialogTitle sx={{ color: '#e53e3e', fontWeight: 'bold' }}>
          Hapus Pengguna
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1rem', color: '#4a5568' }}>
            Apakah Anda yakin ingin menghapus <strong>{selectedUser?.fullName}</strong>? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={handleCloseDeleteDialog}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Batal
          </Button>
          <Button 
            onClick={handleDeleteUser} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;
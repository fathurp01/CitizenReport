import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, IconButton, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
      setError('Failed to load users. Please try again later.');
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
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
    } catch (err) {
      console.error('Error updating user:', err);
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to update user', severity: 'error' });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/admin/users/${selectedUser.id}`);
      fetchUsers();
      handleCloseDeleteDialog();
      setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
    } catch (err) {
      console.error('Error deleting user:', err);
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to delete user', severity: 'error' });
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

  if (loading) return <TableSkeleton />;
  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>User Management</Typography>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>RT/RW</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      {user.role === 'citizen' ? 'Citizen' :
                       user.role === 'village_staff' ? 'Village Staff' :
                       user.role === 'admin' ? 'Admin' : user.role}
                    </TableCell>
                    <TableCell>{user.rt}/{user.rw}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEditClick(user)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(user)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField fullWidth margin="normal" label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange} label="Role">
                <MenuItem value="citizen">Citizen</MenuItem>
                <MenuItem value="village_staff">Village Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth margin="normal" label="RT" name="rt" value={formData.rt} onChange={handleChange} />
              <TextField fullWidth margin="normal" label="RW" name="rw" value={formData.rw} onChange={handleChange} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedUser?.fullName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">Delete</Button>
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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;

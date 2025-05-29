import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Paper,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles');
      setArticles(res.data);
    } catch (error) {
      console.error('Gagal memuat artikel', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      setArticles(articles.filter(a => a.id !== id));
    } catch (error) {
      alert('Gagal menghapus artikel');
    }
  };

  const handleApprove = async (id, status) => {
    try {
      await axios.put(`/api/articles/${id}/status`, { status });
      setArticles(articles.map(a => a.id === id ? { ...a, status } : a));
    } catch (error) {
      alert('Gagal mengubah status artikel');
    }
  };

  const openEditDialog = (article) => {
    setSelectedArticle(article);
    setEditedTitle(article.title);
    setEditedContent(article.content);
    setEditMode(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/api/articles/${selectedArticle.id}`, {
        title: editedTitle,
        content: editedContent
      });
      setArticles(articles.map(a => a.id === selectedArticle.id ? { ...a, title: editedTitle, content: editedContent } : a));
      setEditMode(false);
      setSelectedArticle(null);
    } catch (error) {
      alert('Gagal mengedit artikel');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Manajemen Artikel</Typography>

      <Grid container spacing={3}>
        {articles.map(article => (
          <Grid item xs={12} md={6} key={article.id}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" color="text.secondary">By: {article.author}</Typography>
              <Typography variant="body1" paragraph>{article.content.slice(0, 100)}...</Typography>
              <Chip label={article.status} color={article.status === 'approved' ? 'success' : article.status === 'rejected' ? 'error' : 'default'} style={{ marginBottom: 10 }} />
              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="outlined" color="primary" onClick={() => openEditDialog(article)}>Edit</Button>
                <Button variant="outlined" color="success" onClick={() => handleApprove(article.id, 'approved')}>Approve</Button>
                <Button variant="outlined" color="warning" onClick={() => handleApprove(article.id, 'rejected')}>Reject</Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(article.id)}>Delete</Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog untuk edit artikel */}
      <Dialog open={editMode} onClose={() => setEditMode(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit Artikel</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Judul"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Konten"
            multiline
            rows={6}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)} color="secondary">Batal</Button>
          <Button onClick={handleEditSubmit} color="primary">Simpan</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArticleManagement;

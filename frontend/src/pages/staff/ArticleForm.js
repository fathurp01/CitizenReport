import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

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
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Tambah Artikel</Typography>

      <TextField
        fullWidth
        label="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Konten"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={5}
        margin="normal"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginTop: 16 }}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Simpan
      </Button>
    </form>
  );
}

export default ArticleForm;

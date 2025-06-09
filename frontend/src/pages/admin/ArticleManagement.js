import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      console.log('Gagal memuat artikel');
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      default: return '#F59E0B';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      default: return 'Menunggu';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          📰
        </div>
        <h1 style={styles.title}>Kelola Artikel</h1>
        <p style={styles.subtitle}>Kelola dan moderasi artikel dengan mudah dan profesional</p>
      </div>

      {/* Articles Grid */}
      <div style={styles.grid}>
        {articles.map((article, index) => (
          <div 
            key={article.id} 
            style={{
              ...styles.card,
              animationDelay: `${index * 150}ms`
            }}
          >
            {/* Status Badge */}
            <div style={styles.cardHeader}>
              <span 
                style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(article.status) + '20',
                  color: getStatusColor(article.status),
                  border: `1px solid ${getStatusColor(article.status)}40`
                }}
              >
                {getStatusText(article.status)}
              </span>
            </div>

            {/* Article Content */}
            <div style={styles.cardContent}>
              <h3 style={styles.articleTitle}>{article.title}</h3>
              
              <div style={styles.authorSection}>
                <div style={styles.authorIcon}>👤</div>
                <span style={styles.authorName}>{article.author}</span>
              </div>

              <p style={styles.articlePreview}>
                {article.content.slice(0, 100)}...
              </p>
            </div>

            {/* Action Buttons */}
            <div style={styles.cardActions}>
              <button 
                style={styles.editButton}
                onClick={() => openEditDialog(article)}
              >
                ✏️ Edit
              </button>
              <button 
                style={styles.approveButton}
                onClick={() => handleApprove(article.id, 'approved')}
              >
                ✅ Setujui
              </button>
              <button 
                style={styles.rejectButton}
                onClick={() => handleApprove(article.id, 'rejected')}
              >
                ❌ Tolak
              </button>
              <button 
                style={styles.deleteButton}
                onClick={() => handleDelete(article.id)}
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div style={styles.modalOverlay} onClick={() => setEditMode(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>✏️ Edit Artikel</h2>
            </div>

            {/* Modal Content */}
            <div style={styles.modalContent}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Judul Artikel</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={styles.input}
                  placeholder="Masukkan judul artikel..."
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Konten Artikel</label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={8}
                  style={styles.textarea}
                  placeholder="Masukkan konten artikel..."
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div style={styles.modalActions}>
              <button 
                style={styles.cancelButton}
                onClick={() => setEditMode(false)}
              >
                Batal
              </button>
              <button 
                style={styles.saveButton}
                onClick={handleEditSubmit}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    color: 'white'
  },
  headerIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: '300',
    color: 'rgba(255,255,255,0.8)',
    margin: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  card: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.6s ease forwards',
    cursor: 'default',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1.5rem'
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  cardContent: {
    marginBottom: '2rem'
  },
  articleTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 1rem 0',
    lineHeight: '1.3',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  authorSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  authorIcon: {
    backgroundColor: '#667eea',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem',
    fontSize: '0.875rem'
  },
  authorName: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: '0.875rem'
  },
  articlePreview: {
    color: '#4b5563',
    lineHeight: '1.6',
    fontSize: '0.875rem',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: 0
  },
  cardActions: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  editButton: {
    flex: '1 1 auto',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px',
    ':hover': {
      backgroundColor: '#2563eb'
    }
  },
  approveButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  rejectButton: {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'hidden',
    animation: 'slideIn 0.3s ease'
  },
  modalHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.5rem 2rem',
    color: 'white'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: 0
  },
  modalContent: {
    padding: '2rem',
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  inputGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    ':focus': {
      borderColor: '#667eea'
    }
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
    ':focus': {
      borderColor: '#667eea'
    }
  },
  modalActions: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #d1d5db',
    backgroundColor: 'white',
    color: '#6b7280',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  saveButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(102,126,234,0.3)'
  }
};

export default ArticleManagement;
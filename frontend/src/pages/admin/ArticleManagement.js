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

  // Calculate statistics
  const totalArticles = articles.length;
  const approvedArticles = articles.filter(a => a.status === 'approved').length;
  const pendingArticles = articles.filter(a => a.status === 'pending' || !a.status).length;
  const rejectedArticles = articles.filter(a => a.status === 'rejected').length;

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerIcon}>📊</div>
          <div>
            <h1 style={styles.title}>Pengelolaan Artikel</h1>
            <p style={styles.subtitle}>Pantau dan kelola artikel yang bermanfaat </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, backgroundColor: '#E0F2FE', borderLeft: '4px solid #0EA5E9'}}>
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statContent}>
            <div style={{...styles.statNumber, color: '#0EA5E9'}}>{totalArticles}</div>
            <div style={styles.statLabel}>Total Artikel</div>
          </div>
        </div>

        <div style={{...styles.statCard, backgroundColor: '#FDF2F8', borderLeft: '4px solid #EC4899'}}>
          <div style={styles.statIcon}>⏱️</div>
          <div style={styles.statContent}>
            <div style={{...styles.statNumber, color: '#EC4899'}}>{pendingArticles}</div>
            <div style={styles.statLabel}>Total Menunggu</div>
          </div>
        </div>

        <div style={{...styles.statCard, backgroundColor: '#F0FDF4', borderLeft: '4px solid #22C55E'}}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statContent}>
            <div style={{...styles.statNumber, color: '#22C55E'}}>{approvedArticles}</div>
            <div style={styles.statLabel}>Disetujui</div>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: totalArticles > 0 ? `${(approvedArticles / totalArticles) * 100}%` : '0%'
                }}
              ></div>
            </div>
            <div style={styles.progressText}>
              {totalArticles > 0 ? `${Math.round((approvedArticles / totalArticles) * 100)}%` : '0%'} tingkat persetujuan
            </div>
          </div>
        </div>

        <div style={{...styles.statCard, backgroundColor: '#FFFBEB', borderLeft: '4px solid #F59E0B'}}>
          <div style={styles.statIcon}>💬</div>
          <div style={styles.statContent}>
            <div style={{...styles.statNumber, color: '#F59E0B'}}>{rejectedArticles}</div>
            <div style={styles.statLabel}>Artikel Ditolak</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Articles List Section */}
        <div style={styles.articlesSection}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionIcon}>📰</div>
            <h2 style={styles.sectionTitle}>Kelola Artikel</h2>
          </div>
          
          <div style={styles.articlesGrid}>
            {articles.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📄</div>
                <h3 style={styles.emptyTitle}>Belum ada artikel</h3>
                <p style={styles.emptyText}>Artikel yang dibuat akan muncul di sini</p>
              </div>
            ) : (
              articles.map((article, index) => (
                <div 
                  key={article.id} 
                  style={{
                    ...styles.articleCard,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Status Badge */}
                  <div style={styles.cardHeader}>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(article.status) + '15',
                        color: getStatusColor(article.status),
                        border: `1px solid ${getStatusColor(article.status)}30`
                      }}
                    >
                      {getStatusText(article.status)}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div style={styles.cardContent}>
                    <h3 style={styles.articleTitle}>{article.title}</h3>
                    
                    <div style={styles.authorSection}>
                      <div style={styles.authorAvatar}>
                        {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <span style={styles.authorName}>{article.author || 'Anonymous'}</span>
                    </div>

                    <p style={styles.articlePreview}>
                      {article.content ? article.content.slice(0, 120) + '...' : 'Tidak ada konten'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={styles.cardActions}>
                    <button 
                      style={styles.editButton}
                      onClick={() => openEditDialog(article)}
                    >
                      <span style={styles.buttonIcon}>✏️</span>
                      Edit
                    </button>
                    <button 
                      style={styles.approveButton}
                      onClick={() => handleApprove(article.id, 'approved')}
                    >
                      <span style={styles.buttonIcon}>✅</span>
                      Setujui
                    </button>
                    <button 
                      style={styles.rejectButton}
                      onClick={() => handleApprove(article.id, 'rejected')}
                    >
                      <span style={styles.buttonIcon}>❌</span>
                      Tolak
                    </button>
                    <button 
                      style={styles.deleteButton}
                      onClick={() => handleDelete(article.id)}
                    >
                      <span style={styles.buttonIcon}>🗑️</span>
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div style={styles.activitySection}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionIcon}>🕒</div>
            <h2 style={styles.sectionTitle}>Aktivitas Terbaru</h2>
          </div>
          
          <div style={styles.activityContent}>
            {articles.length > 0 ? (
              <div style={styles.activityItem}>
                <div style={styles.activityBadge}>📝</div>
                <div style={styles.activityInfo}>
                  <div style={styles.activityNumber}>{articles.length}</div>
                  <div style={styles.activityLabel}>Artikel • {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
              </div>
            ) : (
              <div style={styles.noActivity}>
                <div style={styles.noActivityIcon}>📊</div>
                <p style={styles.noActivityText}>Belum ada aktivitas terbaru</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div style={styles.modalOverlay} onClick={() => setEditMode(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>✏️ Edit Artikel</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setEditMode(false)}
              >
                ✕
              </button>
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem 2rem 3rem',
    borderRadius: '0 0 1rem 1rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.15)'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  headerIcon: {
    fontSize: '3rem',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    fontSize: '1.125rem',
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    maxWidth: '1400px',
    margin: '0 auto 3rem',
    padding: '0 2rem'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    cursor: 'default',
    minWidth: 0,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    }
  },
  statIcon: {
    fontSize: '2rem',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '12px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    flexShrink: 0
  },
  statContent: {
    flex: 1,
    minWidth: 0
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 0 0.25rem 0',
    lineHeight: 1
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#E5E7EB',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: '3px',
    transition: 'width 0.5s ease'
  },
  progressText: {
    fontSize: '0.75rem',
    color: '#6B7280',
    fontWeight: '500'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  articlesSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '600px'
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    height: 'fit-content'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #E5E7EB'
  },
  sectionIcon: {
    fontSize: '1.5rem',
    backgroundColor: '#F3F4F6',
    borderRadius: '10px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1F2937',
    margin: 0
  },
  articlesGrid: {
    display: 'grid',
    gap: '1.5rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#6B7280'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 0.5rem 0'
  },
  emptyText: {
    fontSize: '0.875rem',
    margin: 0
  },
  articleCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #E5E7EB',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.5s ease forwards',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      backgroundColor: 'white'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem'
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  cardContent: {
    marginBottom: '1.5rem'
  },
  articleTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 1rem 0',
    lineHeight: '1.4',
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
  authorAvatar: {
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.75rem',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  authorName: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: '0.875rem'
  },
  articlePreview: {
    color: '#4B5563',
    lineHeight: '1.5',
    fontSize: '0.875rem',
    margin: 0
  },
  cardActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem'
  },
  editButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#2563EB',
      transform: 'translateY(-1px)'
    }
  },
  approveButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#059669',
      transform: 'translateY(-1px)'
    }
  },
  rejectButton: {
    backgroundColor: '#F59E0B',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#D97706',
      transform: 'translateY(-1px)'
    }
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#DC2626',
      transform: 'translateY(-1px)'
    }
  },
  buttonIcon: {
    fontSize: '0.875rem'
  },
  activityContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    border: '1px solid #E5E7EB'
  },
  activityBadge: {
    backgroundColor: '#22C55E',
    color: 'white',
    borderRadius: '10px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem'
  },
  activityInfo: {
    flex: 1
  },
  activityNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 0.25rem 0'
  },
  activityLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontWeight: '500'
  },
  noActivity: {
    textAlign: 'center',
    padding: '2rem 1rem',
    color: '#6B7280'
  },
  noActivityIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  noActivityText: {
    fontSize: '0.875rem',
    margin: 0
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.2)'
    }
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
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #E5E7EB',
    borderRadius: '10px',
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
    border: '2px solid #E5E7EB',
    borderRadius: '10px',
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
    borderTop: '1px solid #E5E7EB',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #D1D5DB',
    backgroundColor: 'white',
    color: '#6B7280',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#F9FAFB',
      borderColor: '#9CA3AF'
    }
  },
  saveButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(102,126,234,0.4)'
    }
  }
};

export default ArticleManagement;
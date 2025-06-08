import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from '../../components/common/ArticleCard';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null); // State untuk modal

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/articles');
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

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedArticle(null);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid #c4b5fd',
            borderTop: '3px solid #8b5cf6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 24px'
          }}></div>
          <p style={{ 
            color: '#7c3aed', 
            fontSize: '16px', 
            fontWeight: '500',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>Memuat artikel...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.1)'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
          <p style={{ 
            color: '#dc2626', 
            fontSize: '16px', 
            fontWeight: '500',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Container */}
      <div style={{ 
        minHeight: '100vh', 
        background: '#f9fafb',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.4
          }}></div>
          
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '80px 24px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Clean Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(124, 58, 237, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '8px 16px',
              marginBottom: '32px',
              border: '1px solid rgba(124, 58, 237, 0.3)'
            }}>
              <span style={{
                color: '#c4b5fd',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.025em'
              }}>📚 ARTIKEL TERPERCAYA</span>
            </div>

            {/* Modern Title */}
            <h1 style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 16px 0',
              lineHeight: '1.1',
              letterSpacing: '-0.025em'
            }}>
              Wawasan untuk <br />
              <span style={{
                background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Kehidupan Sehari-hari</span>
            </h1>

            {/* Clean Subtitle */}
            <p style={{
              color: '#ddd6fe',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Temukan artikel berkualitas yang memberikan informasi bermanfaat dan terpercaya untuk Anda dan keluarga
            </p>

            {/* Minimalist Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '4px'
                }}>{articles.length}+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#c4b5fd',
                  fontWeight: '500'
                }}>Artikel</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '4px'
                }}>100%</div>
                <div style={{
                  fontSize: '14px',
                  color: '#c4b5fd',
                  fontWeight: '500'
                }}>Terpercaya</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '4px'
                }}>24/7</div>
                <div style={{
                  fontSize: '14px',
                  color: '#c4b5fd',
                  fontWeight: '500'
                }}>Akses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '64px 24px'
        }}>
          {articles.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '48px 32px',
              textAlign: 'center',
              boxShadow: '0 1px 3px 0 rgba(139, 92, 246, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📖</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#6366f1',
                marginBottom: '8px'
              }}>Belum Ada Artikel</h3>
              <p style={{ color: '#8b5cf6', fontSize: '15px' }}>
                Artikel akan segera tersedia untuk Anda
              </p>
            </div>
          ) : (
            articles.map((article) => (
              <div 
                key={article.id} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '24px',
                  boxShadow: '0 1px 3px 0 rgba(139, 92, 246, 0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px -5px rgba(139, 92, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(139, 92, 246, 0.1)';
                }}
              >
                {/* Clean Article Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    📰
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#8b5cf6',
                      marginBottom: '2px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Artikel Kesehatan</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#7c3aed'
                    }}>Oleh {article.author || 'Dr. Sari Medika'}</div>
                  </div>
                </div>

                {/* Article Title */}
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#6366f1',
                  marginBottom: '16px',
                  lineHeight: '1.4'
                }}>
                  {article.title}
                </h2>

                {/* Article Preview */}
                <p style={{
                  color: '#6b7280',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  margin: '0 0 24px 0'
                }}>
                  {article.content ? 
                    article.content.substring(0, 180) + '...' : 
                    'Dalam era digital ini, menjaga kesehatan fisik dan mental menjadi tantangan tersendiri. Penggunaan teknologi yang berlebihan dapat mempengaruhi kesehatan mental kita...'
                  }
                </p>

                {/* Clean Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '13px',
                    color: '#7c3aed'
                  }}>
                    <span>📅 Hari ini</span>
                    <span style={{ color: '#c4b5fd' }}>•</span>
                    <span>5 min baca</span>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    style={{
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#7c3aed';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#8b5cf6';
                    }}
                  >
                    Baca →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modern Modal */}
      {selectedArticle && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(99, 102, 241, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
              animation: 'slideUp 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              padding: '24px 32px',
              color: 'white'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(196, 181, 253, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}>📰</div>
                  <div>
                    <h2 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: 0
                    }}>Detail Artikel</h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{
              maxHeight: 'calc(90vh - 80px)',
              overflowY: 'auto',
              padding: '32px'
            }}>
              {/* Author Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>👤</div>
                <div>
                  <div style={{
                    fontWeight: '500',
                    color: '#6366f1',
                    fontSize: '15px'
                  }}>{selectedArticle.author}</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#7c3aed'
                  }}>Penulis Artikel</div>
                </div>
              </div>

              {/* Article Image */}
              {selectedArticle.image && (
                <img 
                  src={`http://localhost:3000/uploads/${selectedArticle.image}`} 
                  alt={selectedArticle.title} 
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '24px'
                  }}
                />
              )}

              {/* Article Title */}
              <h1 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#6366f1',
                marginBottom: '20px',
                lineHeight: '1.3'
              }}>
                {selectedArticle.title}
              </h1>

              {/* Article Content */}
              <div style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#374151'
              }}>
                {selectedArticle.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} style={{
                      marginBottom: '16px',
                      margin: '0 0 16px 0'
                    }}>
                      {paragraph}
                    </p>
                  )
                ))}
              </div>

              {/* Modal Footer */}
              <div style={{
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#7c3aed'
                }}>
                  📅 Dipublikasikan hari ini
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    color: '#7c3aed',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </>
  );
};

export default ArticleList;
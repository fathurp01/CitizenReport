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

  if (loading) return <div>Memuat artikel...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 20px 0',
            letterSpacing: '2px'
          }}>
            ARTIKEL UNTUK WARGA
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#FCD34D',
            margin: '0 auto 20px auto'
          }}></div>
          <p style={{
            color: '#E9D5FF',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Temukan informasi terkini dan bermanfaat untuk kehidupan sehari-hari
          </p>
        </div>

        {/* Articles */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {articles.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              color: '#6B7280'
            }}>
              Belum ada artikel yang tersedia.
            </div>
          ) : (
            articles.map((article) => (
              <div key={article.id} style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>

                {/* Article image atau icon */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  {article.image ? (
                    <img 
                      src={`http://localhost:3000/uploads/${article.image}`}
                      alt={article.title}
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '80px',
                      height: '60px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '8px',
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      📰
                    </div>
                  )}
                </div>

                {/* Preview artikel (hanya title dan excerpt) */}
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    marginBottom: '16px',
                    color: '#1F2937'
                  }}>
                    {article.title}
                  </h2>
                  <p style={{
                    color: '#6B7280',
                    lineHeight: '1.6',
                    fontSize: '16px'
                  }}>
                    {article.content ? 
                      article.content.substring(0, 150) + '...' : 
                      'Dalam era digital ini, menjaga kesehatan fisik dan mental menjadi tantangan tersendiri...'
                    }
                  </p>
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6B7280',
                    fontSize: '14px'
                  }}>
                    👤 {article.author || 'Dr. Sari Medika'}
                  </div>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    style={{
                      color: '#8B5CF6',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    👁️ Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal untuk menampilkan artikel lengkap */}
      {selectedArticle && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '900px',
              maxHeight: '90vh',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div style={{
              padding: '20px 30px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0
              }}>
                Detail Artikel
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ✕
              </button>
            </div>

            {/* Content Modal dengan scroll */}
            <div style={{ 
              maxHeight: 'calc(90vh - 80px)', 
              overflowY: 'auto',
              padding: '0'
            }}>
              {/* Custom ArticleCard untuk modal */}
              <div style={{ padding: '30px' }}>
                {selectedArticle.image && (
                  <img 
                    src={`http://localhost:3000/uploads/${selectedArticle.image}`} 
                    alt={selectedArticle.title} 
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      marginBottom: '24px',
                      borderRadius: '12px'
                    }}
                  />
                )}
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  color: '#1F2937',
                  lineHeight: '1.3'
                }}>
                  {selectedArticle.title}
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  👤 Oleh: {selectedArticle.author}
                </p>
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#374151',
                  textAlign: 'justify'
                }}>
                  {selectedArticle.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleList;

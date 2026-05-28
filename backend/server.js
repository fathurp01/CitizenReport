const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile'); // Tambahkan import ini

// Initialize express app
const app = express();

// ✅ CORS Middleware – Dinamis menggunakan FRONTEND_URL
const frontendOrigin = process.env.FRONTEND_URL 
  ? (process.env.FRONTEND_URL.includes(',') ? process.env.FRONTEND_URL.split(',') : process.env.FRONTEND_URL)
  : 'http://localhost:3000';

app.use(cors({
  origin: frontendOrigin, // asal frontend React dinamis
  credentials: true
}));

// ✅ Tangani preflight request OPTIONS (wajib untuk credentials)
app.options('*', cors());

// ✅ Keamanan tambahan
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // penting jika file diakses cross-origin
}));

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// ✅ Logging
app.use(morgan('dev'));

// ✅ Kompresi response
app.use(compression());

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Pastikan folder upload tersedia
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Serve file static (gambar yang di-upload)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routing utama
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes); // Tambahkan route ini

// ✅ Liveness probe
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

// ✅ Readiness probe (cek koneksi database)
app.get('/ready', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'READY',
      database: 'CONNECTED',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'NOT_READY',
      database: 'DISCONNECTED',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ✅ CPU Load Simulation for HPA Testing
app.get('/api/simulate-load', (req, res) => {
  const start = Date.now();
  // Default ke 50 juta iterasi jika tidak didefinisikan
  const iterations = parseInt(req.query.iterations) || 50000000;
  
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(Math.random()) * Math.sin(Math.random());
  }
  
  const duration = Date.now() - start;
  res.status(200).json({
    message: 'Load simulation complete',
    iterations,
    durationMs: duration,
    result: result.toFixed(4),
    timestamp: new Date().toISOString()
  });
});

// ✅ Default API route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'CitizenReport API is running',
    version: '1.0.0',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// ✅ Halaman root biasa
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CitizenReport API</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          text-align: center;
          max-width: 500px;
        }
        h1 {
          margin-top: 0;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        p {
          margin: 10px 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }
        .status {
          display: inline-block;
          background-color: #48bb78;
          color: white;
          font-weight: bold;
          padding: 5px 15px;
          border-radius: 20px;
          margin-top: 20px;
        }
        .link-button {
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          margin: 10px;
          transition: all 0.3s ease;
        }
        .link-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>CitizenReport API</h1>
        <p>Backend server for the CitizenReport application</p>
        <p>Version: 1.0.0</p>
        <div class="status">Online</div>
        <div class="links">
          <a href="/api-docs" class="link-button">API Documentation</a>
          <a href="/api" class="link-button">API Status</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// ✅ Koneksi DB dan jalankan server
const PORT = process.env.PORT || 5001;

// Import semua models sebelum sync
const Article = require('./models/article');
const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

// Hanya satu sequelize.sync() yang diperlukan
sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '✅ Database connected successfully');
    console.log('\x1b[32m%s\x1b[0m', '✅ All models synced successfully');
    app.listen(PORT, () => {
      console.log('\x1b[36m%s\x1b[0m', `✅ Server running at http://localhost:${PORT}`);
      console.log('\x1b[33m%s\x1b[0m', `📝 API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '❌ DB Sync Error:', err);
    process.exit(1);
  });

// Serve API documentation
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-docs.html'));
});

// HAPUS BAGIAN INI - duplikasi yang menyebabkan error:
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('DB Synced!');
//   })
//   .catch(err => console.error('DB Sync Error:', err));

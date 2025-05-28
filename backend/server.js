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

// Initialize express app
const app = express();

// ✅ CORS Middleware – Fix utama di sini
app.use(cors({
  origin: 'http://localhost:3000', // asal frontend React
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

// ✅ Default API route
app.get('/api', (req, res) => {
  res.json({ message: 'CitizenReport API is running' });
});

// ✅ Halaman root biasa
app.get('/', (req, res) => {
  res.send('CitizenReport API is running');
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
sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
  });

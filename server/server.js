require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const commissionRoutes = require('./routes/commissionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect to MongoDB ───
connectDB();

// ─── CORS — allow local dev + Vercel production ───
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,           // set on Koyeb to your Vercel URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, cURL, mobile apps)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        // Allow any *.vercel.app subdomain (preview deployments)
        /\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

// ─── Core Middleware ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ─── Routes ───
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/commissions', commissionRoutes);

// ─── Health check (Koyeb uses this to verify service is up) ───
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Medusa API is running 🐍',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date(),
  });
});

// ─── 404 ───
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global Error Handler ───
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

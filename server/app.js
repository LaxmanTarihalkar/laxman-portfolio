import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

// ---- Security middleware ----
app.use(helmet());

app.use(
  cors({
    origin(origin, cb) {
      const allowed = (process.env.CLIENT_URL || 'http://localhost:5173')
        .split(',')
        .map((u) => u.trim());
      // allow same-origin / curl (no origin) in dev; block unknown origins
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// ---- Body & cookie parsing ----
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---- Logging ----
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ---- Rate limit all API routes ----
app.use('/api', apiLimiter);

// ---- Health check ----
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running', data: { status: 'ok' } });
});

// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);

// ---- 404 + error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

export default app;

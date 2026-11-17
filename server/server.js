import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables before anything reads them.
dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[server] API running on http://localhost:${PORT}`);
    console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

start().catch((err) => {
  console.error('[server] Failed to start:', err.message);
  process.exit(1);
});

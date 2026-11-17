import mongoose from 'mongoose';

/**
 * Connect to MongoDB.
 * Reads MONGODB_URI from environment. Exits gracefully on failure so the
 * process does not run in a broken state.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[db] MONGODB_URI is not set. Add it to server/.env');
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('[db] MongoDB connected');
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message);
    // Do not crash the API server on connection failure; the app can still
    // start and report a health status, and mongoose will auto-retry.
  }
}

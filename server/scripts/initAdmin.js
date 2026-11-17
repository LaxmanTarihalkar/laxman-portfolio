/**
 * One-time admin initialization script.
 *
 * Creates the single admin account from environment variables. Run with:
 *   npm run init-admin
 *
 * The password is hashed before storage. If an admin with the given email
 * already exists, the script updates the password (handy for resets) but
 * never prints the plaintext to logs.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { connectDB } from '../config/db.js';

dotenv.config();

async function initAdmin() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const username = process.env.ADMIN_USERNAME || 'admin';

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env');
    return process.exit(1);
  }

  if (password.length < 8) {
    console.error('ADMIN_PASSWORD should be at least 8 characters.');
    return process.exit(1);
  }

  try {
    const existing = await Admin.findOne({ email });

    if (existing) {
      existing.username = username;
      existing.passwordHash = password; // pre-save hook hashes it
      await existing.save();
      console.log(`Admin updated: ${email}`);
    } else {
      await Admin.create({
        username,
        email,
        passwordHash: password, // pre-save hook hashes it
        role: 'admin',
      });
      console.log(`Admin created: ${email}`);
    }

    console.log('Done. You can now log in to the admin dashboard.');
  } catch (err) {
    console.error('Failed to initialize admin:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

initAdmin();

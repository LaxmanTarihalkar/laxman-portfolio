import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

function generateToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

/** POST /api/auth/login — authenticate admin and set HTTP-only cookie. */
export async function login(req, _res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+passwordHash');
    if (!admin) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const ok = await admin.comparePassword(password);
    if (!ok) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(admin);

    _res.cookie('token', token, cookieOptions());
    return sendSuccess(_res, { admin }, 'Logged in successfully');
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/logout — clear the auth cookie. */
export function logout(_req, res, _next) {
  res.clearCookie('token', cookieOptions());
  return sendSuccess(res, null, 'Logged out successfully');
}

/** GET /api/auth/me — return the currently authenticated admin. */
export function me(req, _res, next) {
  try {
    return sendSuccess(_res, { admin: req.admin }, 'Session active');
  } catch (err) {
    next(err);
  }
}

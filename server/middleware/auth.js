import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Verify the JWT carried in the HTTP-only cookie (or Authorization header as a
 * fallback) and attach the authenticated admin to the request.
 */
export async function protect(req, _res, next) {
  try {
    let token = null;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authenticated. Please log in.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      throw new ApiError(401, 'The admin account for this session no longer exists.');
    }

    req.admin = admin;
    next();
  } catch (err) {
    if (err instanceof ApiError) return next(err);
    next(new ApiError(401, 'Invalid or expired session. Please log in again.'));
  }
}

/** Restrict a route to a specific role. Defaults to admin. */
export function authorize(role = 'admin') {
  return (req, _res, next) => {
    if (!req.admin || req.admin.role !== role) {
      return next(new ApiError(403, 'You do not have permission to perform this action.'));
    }
    next();
  };
}

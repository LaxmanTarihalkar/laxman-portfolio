import rateLimit from 'express-rate-limit';

/**
 * Strict limiter for the public contact endpoint. Prevents spam / abuse of
 * the form (and the optional SMTP relay behind it).
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 messages per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages from this IP. Please try again later.',
  },
});

/**
 * Limiter for the admin login endpoint to slow brute-force attempts.
 */
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // 10 attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

/** General API limiter. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

import { ApiError } from '../utils/ApiError.js';

/** 404 handler for unknown routes. */
export function notFound(_req, _res, next) {
  next(new ApiError(404, 'Resource not found'));
}

/**
 * Central error handler. Every thrown ApiError and any unexpected error ends
 * up here. Sends a consistent JSON shape and avoids leaking stack traces in
 * production.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  if (statusCode >= 500 && !isOperational) {
    console.error('[error]', err.stack || err.message);
  }

  const body = {
    success: false,
    message:
      statusCode >= 500 && !isOperational
        ? 'Something went wrong on the server.'
        : err.message,
  };

  if (err.details) body.details = err.details;

  if (process.env.NODE_ENV !== 'production') body.stack = err.stack;

  res.status(statusCode).json(body);
}

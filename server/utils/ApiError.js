/**
 * Operational error class with a status code.
 * Throwing ApiError lets the central error handler send a consistent
 * response without try/catch boilerplate in every controller.
 */
export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    if (details) this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

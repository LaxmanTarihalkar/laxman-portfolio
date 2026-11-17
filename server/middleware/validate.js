import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

/**
 * Run after a chain of express-validator checks. Collects errors and converts
 * them into a single 422 ApiError with a details map keyed by field name.
 */
export function validateRequest(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const details = {};
  for (const err of result.array()) {
    if (err.type === 'field' && !details[err.path]) {
      details[err.path] = err.msg;
    }
  }

  next(new ApiError(422, 'Validation failed', details));
}

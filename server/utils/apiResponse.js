/**
 * Helpers to send consistent JSON responses.
 * Keeping the shape identical everywhere makes the frontend's axios layer
 * predictable.
 */
export function sendSuccess(res, data, message, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, message, statusCode = 400, details = null) {
  const body = { success: false, message };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
}

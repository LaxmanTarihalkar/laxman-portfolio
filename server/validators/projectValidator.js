import { body } from 'express-validator';

// Reusable URL validator function — accepts empty/null, rejects non-http(s) strings
const isValidUrl = (value) => {
  if (!value || value.trim() === '') return true;
  return /^https?:\/\/.+/.test(value.trim());
};

export const projectRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),

  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug must be lowercase letters, numbers, and hyphens only'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 5000 }).withMessage('Description cannot exceed 5000 characters'),

  body('technologies')
    .optional()
    .isArray().withMessage('Technologies must be an array'),

  body('image')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Image path too long'),

  body('githubUrl')
    .optional({ checkFalsy: true })
    .custom(isValidUrl).withMessage('GitHub URL must start with http:// or https://'),

  body('liveUrl')
    .optional({ checkFalsy: true })
    .custom(isValidUrl).withMessage('Live URL must start with http:// or https://'),

  body('featured')
    .optional()
    .isBoolean().withMessage('Featured must be a boolean'),

  body('displayOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('displayOrder must be a non-negative integer'),
];

import { body } from 'express-validator';

const urlOptional = body('').custom((value) => {
  if (!value) return true;
  return /^https?:\/\//.test(value);
});

export const projectRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must be lowercase letters, numbers, and hyphens only'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),

  body('technologies').optional().isArray().withMessage('Technologies must be an array'),

  body('image')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Image path too long'),

  body('githubUrl')
    .optional({ checkFalsy: true })
    .custom(urlOptional)
    .withMessage('GitHub URL must start with http(s)://'),

  body('liveUrl')
    .optional({ checkFalsy: true })
    .custom(urlOptional)
    .withMessage('Live URL must start with http(s)://'),

  body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),

  body('displayOrder').optional().isInt({ min: 0 }).withMessage('displayOrder must be a non-negative integer'),
];

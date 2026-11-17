import { body } from 'express-validator';

export const experienceRules = [
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 150 }).withMessage('Company cannot exceed 150 characters'),

  body('position')
    .trim()
    .notEmpty().withMessage('Position is required')
    .isLength({ max: 150 }).withMessage('Position cannot exceed 150 characters'),

  body('type')
    .trim()
    .notEmpty().withMessage('Employment type is required'),

  body('duration')
    .trim()
    .notEmpty().withMessage('Duration is required'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 150 }).withMessage('Location cannot exceed 150 characters'),

  body('responsibilities')
    .optional()
    .isArray().withMessage('Responsibilities must be an array'),

  body('technologies')
    .optional()
    .isArray().withMessage('Technologies must be an array'),

  body('displayOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('displayOrder must be a non-negative integer'),
];

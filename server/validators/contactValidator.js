import { body } from 'express-validator';

export const contactRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('A valid email is required'),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 5000 })
    .withMessage('Message cannot exceed 5000 characters'),
];

export const contactStatusRules = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['unread', 'read'])
    .withMessage('Status must be "unread" or "read"'),
];

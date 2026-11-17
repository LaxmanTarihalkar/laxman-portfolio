import { body } from 'express-validator';

export const loginRules = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('A valid email is required'),

  body('password').trim().notEmpty().withMessage('Password is required'),
];

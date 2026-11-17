import { Router } from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { contactRules, contactStatusRules } from '../validators/contactValidator.js';
import { validateRequest } from '../middleware/validate.js';
import { protect, authorize } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public (rate limited to prevent spam)
router.post('/', contactLimiter, contactRules, validateRequest, createContact);

// Admin only
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.patch('/:id', protect, authorize('admin'), contactStatusRules, validateRequest, updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;

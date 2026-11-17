import { Router } from 'express';
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { experienceRules } from '../validators/experienceValidator.js';
import { validateRequest } from '../middleware/validate.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', getExperiences);
router.get('/:id', getExperience);

// Admin only
router.post('/', protect, authorize('admin'), experienceRules, validateRequest, createExperience);
router.put('/:id', protect, authorize('admin'), experienceRules, validateRequest, updateExperience);
router.delete('/:id', protect, authorize('admin'), deleteExperience);

export default router;

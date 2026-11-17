import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { projectRules } from '../validators/projectValidator.js';
import { validateRequest } from '../middleware/validate.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin only
router.post('/', protect, authorize('admin'), projectRules, validateRequest, createProject);
router.put('/:id', protect, authorize('admin'), projectRules, validateRequest, updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

export default router;

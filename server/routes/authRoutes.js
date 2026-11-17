import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { loginRules } from '../validators/authValidator.js';
import { validateRequest } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', loginLimiter, loginRules, validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;

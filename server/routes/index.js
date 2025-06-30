import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import courseRoutes from './courseRoutes.js';
import lessonRoutes from './lessonRoutes.js';
import { protect } from '../middleware/authMiddleware.js';
import { isNotStudent } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/course', protect, isNotStudent, courseRoutes);
router.use('/lesson', protect, isNotStudent, lessonRoutes);

export default router;

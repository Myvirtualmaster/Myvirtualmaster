import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import courseRoutes from './courseRoutes.js';
import lessonRoutes from './lessonRoutes.js';
import resourceRoutes from './resourceRoutes.js';
import quizRoutes from './quizRoutes.js';
import questionRoutes from './questionRoutes.js';
import quizAttemptRoutes from './quizAttemptRoutes.js';
import { protect } from '../middleware/authMiddleware.js';
import { isNotStudent } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/course', protect, isNotStudent, courseRoutes);
router.use('/lesson', protect, isNotStudent, lessonRoutes);
router.use('/resource', protect, isNotStudent, resourceRoutes);
router.use('/quiz', protect, isNotStudent, quizRoutes);
router.use('/question', protect, isNotStudent, questionRoutes);
router.use('/attempt', protect, isNotStudent, quizAttemptRoutes);

export default router;

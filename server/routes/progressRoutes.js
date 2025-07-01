import express from 'express';
import {
  createProgress,
  getProgressByUser,
  getProgressByUserAndCourse,
  getProgressByLesson,
  updateProgress,
  deleteProgress
} from '../controllers/progressController.js';

import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', protect, createProgress);
router.get('/:userId', getProgressByUser);
router.get('/:userId/course/:courseId', getProgressByUserAndCourse);
router.get('/:userId/lesson/:lessonId', getProgressByLesson);
router.put('/update/:id', protect, updateProgress);
router.delete('/delete/:id', protect, deleteProgress);

export default router;


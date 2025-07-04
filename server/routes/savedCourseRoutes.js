import express from 'express';
import { saveCourse, getSavedCourses, unsaveCourse } from '../controllers/savedCourseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protect, saveCourse);
router.get('/', protect, getSavedCourses);
router.delete('/:courseId', protect, unsaveCourse);

export default router;


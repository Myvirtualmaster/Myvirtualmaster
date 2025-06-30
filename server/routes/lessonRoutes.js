import express from 'express';
import { createLesson, getLessonByCourse } from '../controllers/lessonController.js';

const router = express.Router();

router.post('/register/:courseId', createLesson);
router.get('/:courseId', getLessonByCourse);

export default router;

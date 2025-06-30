import express from 'express';
import { createLesson, deleteLesson, getLessonByCourse, getLessonById, updateLesson } from '../controllers/lessonController.js';

const router = express.Router();

router.post('/register/:courseId', createLesson);
router.get('/:courseId', getLessonByCourse);
router.get('/single/:id', getLessonById);
router.delete('/delete/:id', deleteLesson);
router.put('/update/:id', updateLesson);

export default router;

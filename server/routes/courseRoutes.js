import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
const router = express.Router();

router.post('/register', createCourse);
router.get('/', getAllCourses);
router.get('/:id',getCourseById);
router.delete('/delete/:id', deleteCourse);
router.put('/update/:id', updateCourse);

export default router;

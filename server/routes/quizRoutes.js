import express from 'express';
import { createQuiz, deleteQuiz, getQuizById, getQuizByLesson, updateQuiz } from '../controllers/quizController.js';

const router = express.Router();

router.post('/register/:lessonId', createQuiz);
router.get('/:lessonId', getQuizByLesson);
router.get('/single/:id', getQuizById);
router.delete('/delete/:id', deleteQuiz);
router.put('/update/:id', updateQuiz);

export default router;

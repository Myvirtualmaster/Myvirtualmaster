import express from 'express';
import { createQuestion, deleteQuestion, getQuestionById, getQuestionByQuiz, updateQuestion } from '../controllers/questionController.js';

const router = express.Router();

router.post('/register/:quizId', createQuestion);
router.get('/:questionId', getQuestionByQuiz);
router.get('/single/:id', getQuestionById);
router.delete('/delete/:id', deleteQuestion);
router.put('/update/:id', updateQuestion);

export default router;

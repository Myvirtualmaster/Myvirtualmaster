import express from 'express';
import { createAttempt, deleteAttempt, getAllAttempts, getAttemptById } from '../controllers/quizAttemptController.js';

const router = express.Router();

router.post('/register/:quizId', createAttempt);
router.get('/', getAllAttempts);
router.get('/single/:id', getAttemptById);
router.delete('/delete/:id', deleteAttempt);

export default router;

import express from 'express';
import { createFeedback, deleteFeedback, getAllFeedback, getFeedbackById, getFeedbackByLesson } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getAllFeedback);
router.get('/:id', getFeedbackById);
router.get('/lesson/:lessonId', getFeedbackByLesson);
router.delete('/:id', deleteFeedback);

export default router;

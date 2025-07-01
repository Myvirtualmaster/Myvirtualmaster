import express from 'express';
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from '../controllers/courseReviewController.js';

const router = express.Router();

router.post('/register/:courseId', createReview);
router.get('/', getAllReviews);
router.get('/single/:id', getReviewById);
router.delete('/delete/:id', deleteReview);
router.put('/update/:id', updateReview);

export default router;

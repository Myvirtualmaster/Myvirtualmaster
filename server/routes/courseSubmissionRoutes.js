import express from 'express';
import { submitCourse, getAllSubmissions, reviewSubmission } from '../controllers/courseSubmissionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, submitCourse);
router.get('/', protect, isAdmin, getAllSubmissions);
router.put('/review/:id', protect, isAdmin, reviewSubmission);

export default router;


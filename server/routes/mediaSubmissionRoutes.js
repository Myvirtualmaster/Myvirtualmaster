import express from 'express';
import {
  createMediaSubmission,
  getMediaByAssignment,
  getMediaByUser,
  deleteMediaSubmission
} from '../controllers/mediaSubmissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createMediaSubmission);
router.get('/assignment/:assignmentId', protect, getMediaByAssignment);
router.get('/user/:userId', protect, getMediaByUser);
router.delete('/:id', protect, deleteMediaSubmission);

export default router;


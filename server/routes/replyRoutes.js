import express from 'express';
import {
  createReply,
  getRepliesByPost,
  toggleLikeReply,
} from '../controllers/replyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReply);
router.get('/:postId', protect, getRepliesByPost);
router.put('/:id/like', protect, toggleLikeReply);

export default router;


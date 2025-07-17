import express from 'express';
import {
  createPost,
  getPostsByForum,
  toggleLikePost,
  markPostResolved,
  getPaginatedPosts,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/:forumId', protect, getPostsByForum);
router.get('/', getPaginatedPosts);
router.put('/:id/like', protect, toggleLikePost);
router.put('/:id/resolved', protect, markPostResolved);

export default router;


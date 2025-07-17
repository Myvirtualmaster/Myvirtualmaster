import express from 'express';
import { createForum, getForumsByCourse } from '../controllers/forumController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createForum);
router.get('/:courseId', protect, getForumsByCourse);

export default router;


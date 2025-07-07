import express from 'express';
import {
  createLiveClass,
  getLiveClassesByCourse,
  deleteLiveClass,
} from '../controllers/liveClassController.js';

import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, isAdmin, createLiveClass);
router.get('/:courseId', protect, getLiveClassesByCourse);
router.delete('/:id', protect, isAdmin, deleteLiveClass);

export default router;


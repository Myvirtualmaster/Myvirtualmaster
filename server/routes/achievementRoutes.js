import express from 'express';
import {
  awardBadge,
  getUserAchievements,
  deleteUserAchievement
} from '../controllers/achievementController.js';

const router = express.Router();

router.post('/', awardBadge);
router.get('/:userId', getUserAchievements);
router.delete('/:id', deleteUserAchievement);

export default router;

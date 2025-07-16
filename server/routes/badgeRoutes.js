import express from 'express';
import {
  createBadge,
  getAllBadges,
  getBadgeById,
  updateBadge,
  deleteBadge
} from '../controllers/badgeController.js';

const router = express.Router();

router.post('/', createBadge);
router.get('/', getAllBadges);
router.get('/:id', getBadgeById);
router.put('/:id', updateBadge);
router.delete('/:id', deleteBadge);

export default router;

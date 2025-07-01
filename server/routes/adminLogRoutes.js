import express from 'express';
import {
  createLog,
  getAllLogs,
  getLogById,
  getLogsByAdmin,
  updateLog,
  deleteLog
} from '../controllers/adminLogController.js';

import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', protect, isAdmin, createLog);
router.get('/', protect, isAdmin, getAllLogs);
router.get('/single/:id', protect, isAdmin, getLogById);
router.get('/admin/:adminId', protect, isAdmin, getLogsByAdmin);
router.put('/update/:id', protect, isAdmin, updateLog);
router.delete('/delete/:id', protect, isAdmin, deleteLog);

export default router;


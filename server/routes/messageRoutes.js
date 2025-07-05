import express from 'express';
import { sendMessage, getConversation, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:userId', protect, getConversation);
router.delete('/delete/:userId', protect, deleteMessage);

export default router;


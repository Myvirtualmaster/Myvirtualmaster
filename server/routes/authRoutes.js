import express from 'express';
import { deleteUser, loginUser, registerUser, updateUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete/:id', protect, isAdmin, deleteUser);
router.put('/update/:id', protect, isAdmin, updateUser);

export default router;

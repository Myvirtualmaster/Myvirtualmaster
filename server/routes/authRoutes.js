import express from 'express';
import { deleteUser, loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete', deleteUser);

export default router;

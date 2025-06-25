import { getAllUsers, getUserById } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;

import { getAllUsers, getUserById } from "../controllers/authController.js";
import express from 'express';
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get('/', isAdmin, getAllUsers);
router.get('/:id', protect, getUserById);

export default router;

import express from 'express';
import {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByUser,
  deleteCertificate
} from '../controllers/certificateController.js';

import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', protect, isAdmin, createCertificate);
router.get('/', protect, isAdmin, getAllCertificates);
router.get('/single/:id', protect, getCertificateById);
router.get('/user/:userId', protect, getCertificatesByUser);
router.delete('/delete/:id', protect, isAdmin, deleteCertificate);

export default router;


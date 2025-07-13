import express from 'express';
import {
  createPayment,
  getPaymentsByUser,
  getAllPayments,
  updatePaymentStatus,
  deletePayment
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/user/:userId', getPaymentsByUser);
router.get('/', getAllPayments);
router.put('/:id/status', updatePaymentStatus);
router.delete('/:id', deletePayment);

export default router;

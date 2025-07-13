import { Payment } from "../models/index.js";

export const createPayment = async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, user: req.user.id});
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create payment', error });
  }
};

export const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId }).populate('course');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments', err });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user course');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all payments', err });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Payment.findByIdAndUpdate(id, { status, paid_at: new Date() }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update payment status', err });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete payment', err });
  }
};

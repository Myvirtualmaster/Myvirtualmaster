import { QuizAttempt } from "../models/index.js";

export const createAttempt = async (req, res) => {
  try {
    console.log({...req.body, user: req.user.id, quiz: req.params.quizId});
    const attempt = new QuizAttempt({ ...req.body, user: req.user.id, quiz: req.params.quizId });
    await attempt.save();
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit attempt', error });
  }
};

export const getAllAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find();
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attempts', error });
  }
};

export const getAttemptById = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id);
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attempt', error });
  }
};

export const deleteAttempt = async (req, res) => {
  try {
    const deleted = await QuizAttempt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Attempt not found' });
    res.status(200).json({ message: 'Attempt deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete attempt', error });
  }
};


import {Submission} from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createSubmission = async (req, res) => {
  try {
    const submission = new Submission({ ...req.body, user: req.user.id, assignment: req.params.assignmentId });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit assignment', error });
  }
};

export const getAllSubmissions = async (req, res) => {
  try {
    const queryBuilder = Submission.find();

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch submissions', error });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch submission', error });
  }
};

export const updateSubmission = async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Submission not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update submission', error });
  }
};

export const deleteSubmission = async (req, res) => {
  try {
    const deleted = await Submission.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Submission not found' });
    res.status(200).json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete submission', error });
  }
};


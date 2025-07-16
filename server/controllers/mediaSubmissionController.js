import { MediaSubmission } from '../models/index.js';

export const createMediaSubmission = async (req, res) => {
  try {
    const submission = new MediaSubmission({
      user: req.user.id,
      assignment: req.body.assignment,
      media_type: req.body.media_type,
      media_url: req.body.media_url
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit media', err });
  }
};

export const getMediaByAssignment = async (req, res) => {
  try {
    const submissions = await MediaSubmission.find({ assignment: req.params.assignmentId })
      .populate('user');
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions', err });
  }
};

export const getMediaByUser = async (req, res) => {
  try {
    const submissions = await MediaSubmission.find({ user: req.params.userId })
      .populate('assignment');
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions', err });
  }
};

export const deleteMediaSubmission = async (req, res) => {
  try {
    const deleted = await MediaSubmission.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Submission not found' });
    res.status(200).json({ message: 'Submission deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete submission', err });
  }
};


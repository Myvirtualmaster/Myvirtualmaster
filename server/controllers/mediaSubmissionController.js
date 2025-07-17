import { MediaSubmission } from '../models/index.js';
import { paginate } from '../utils/paginate.js';

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
    const queryBuilder = MediaSubmission.find({ assignment: req.params.assignmentId }).populate('user');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { submitted_at: -1 }
    });

    if (!result.data.length) {
      return res.status(404).json({ message: 'No submissions found for this assignment' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions', err });
  }
};

export const getMediaByUser = async (req, res) => {
  try {
    const queryBuilder = MediaSubmission.find({ user: req.params.userId }).populate('assignment');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { submitted_at: -1 }
    });

    if (!result.data.length) {
      return res.status(404).json({ message: 'No submissions found for this user' });
    }

    res.status(200).json(result);
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


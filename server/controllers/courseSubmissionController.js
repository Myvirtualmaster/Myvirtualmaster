import { CourseSubmission } from "../models/index.js";
import { paginate } from "../utils/paginate.js";

// Create submission
export const submitCourse = async (req, res) => {
  try {
    const submission = new CourseSubmission(req.body);
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit course', err });
  }
}

// Get all submissions (Admin)
export const getAllSubmissions = async (req, res) => {
  try {
    const queryBuilder = CourseSubmission.find().populate('course');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { reviewed_at: -1 }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions', err });
  }
};

// Approve / Reject
export const reviewSubmission = async (req, res) => {
  try {
    const { status, feedback } = req.body;
    const updated = await CourseSubmission.findByIdAndUpdate(
      req.params.id,
      { status, feedback, reviewed_at: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Submission not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to review submission', err });
  }
};


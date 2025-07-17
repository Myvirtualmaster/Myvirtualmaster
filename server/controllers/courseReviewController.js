import { CourseReview } from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createReview = async (req, res) => {
  try {
    const review = new CourseReview({ ...req.body, user: req.user.id, course: req.params.courseId });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create review', err });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const queryBuilder = CourseReview.find();

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { created_at: -1 }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', err });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await CourseReview.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch review', err });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await CourseReview.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update review', err });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deleted = await CourseReview.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', err });
  }
};


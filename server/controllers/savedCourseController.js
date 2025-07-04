import { SavedCourse } from '../models/index.js';

// Save a course
export const saveCourse = async (req, res) => {
  try {
    const exists = await SavedCourse.findOne({ user: req.user.id, course: req.body.course });
    if (exists) return res.status(400).json({ message: 'Course already saved' });

    const saved = new SavedCourse({ user: req.user.id, course: req.body.course, saved_at: new Date() });
    await saved.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save course', err });
  }
};

// Get saved courses
export const getSavedCourses = async (req, res) => {
  try {
    const saved = await SavedCourse.find({ user: req.user.id }).populate('course');
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get saved courses', err });
  }
};

// Unsave a course
export const unsaveCourse = async (req, res) => {
  try {
    const removed = await SavedCourse.findOneAndDelete({ user: req.user.id, course: req.params.courseId });
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Course unsaved' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unsave course', err });
  }
};


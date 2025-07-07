import { LiveClass } from '../models/index.js';

// Create
export const createLiveClass = async (req, res) => {
  try {
    const live = new LiveClass(req.body);
    await live.save();
    res.status(201).json(live);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create live class', err });
  }
};

// Get by course
export const getLiveClassesByCourse = async (req, res) => {
  try {
    const live = await LiveClass.find({ course: req.params.courseId }).sort({ start_time: 1 });
    res.status(200).json(live);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch live classes', err });
  }
};

// Delete
export const deleteLiveClass = async (req, res) => {
  try {
    const deleted = await LiveClass.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Live class not found' });
    res.status(200).json({ message: 'Live class deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete live class', err });
  }
};


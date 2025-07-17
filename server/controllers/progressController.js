import { Lesson, Course, Progress } from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { course, lesson } = req.body;

    // Check if already exists
    const exists = await Progress.findOne({ user: userId, course, lesson });
    if (exists) {
      return res.status(400).json({ message: 'Progress already recorded for this lesson.' });
    }

    // Count progress
    const completedLessons = await Progress.countDocuments({ user: userId, course });
    const totalLessons = await Lesson.countDocuments({ course });

    const progressPct = totalLessons === 0 ? 0 : Math.round(((completedLessons + 1) / totalLessons) * 100);

    // Create progress with required fields
    const progress = new Progress({
      user: userId,
      course,
      lesson,
      completed_at: new Date(),
      lessons_completed: completedLessons + 1,
      total_lessons: totalLessons,
      progress_pct: progressPct,
    });

    await progress.save();

    res.status(201).json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create progress', err });
  }
};

export const getProgressByUser = async (req, res) => {
  try {
    const queryBuilder = Progress.find({ user: req.params.userId }).populate('lesson course');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 }
    });

    if (!result.data.length) {
      return res.status(404).json({ message: 'No progress found for this user.' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch progress', err });
  }
};

export const getProgressByUserAndCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.find({ user: userId, course: courseId }).populate('lesson');
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch course progress', err });
  }
};

export const getProgressByLesson = async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    const progress = await Progress.findOne({ user: userId, lesson: lessonId });
    if (!progress) return res.status(404).json({ message: 'Progress not found for this lesson.' });
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch lesson progress', err });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Progress not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update progress', err });
  }
};

export const deleteProgress = async (req, res) => {
  try {
    const deleted = await Progress.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Progress not found' });
    res.status(200).json({ message: 'Progress deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete progress', err });
  }
};


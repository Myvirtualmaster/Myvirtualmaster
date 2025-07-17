import { Lesson } from "../models/index.js";
import { paginate } from "../utils/paginate.js";

export const createLesson = async (req, res) => {
  try {
    const lesson = new Lesson({ ...req.body, course: req.params.courseId})
    await lesson.save();
    res.status(201).json(lesson);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error});
  }
}

export const getLessonByCourse = async (req, res) => {
  try {
    const queryBuilder = Lesson.find({ course: req.params.courseId });

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: 1 }
    });

    if (!result.data.length) {
      return res.status(404).json({ message: 'No lessons found for this course' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found'});
    res.status(200).json(lesson);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch lesson', error});
  }
}

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    res.status(200).json({ message: 'Lesson deleted' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete Lesson', error });
  }
}

export const updateLesson = async (req, res) => {
  try{
    const updateLesson = await Lesson.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true, runValidators: true});
    if(!updateLesson) return res.status(404).json({ message: 'Lesson not found' });

  res.status(200).json(updateLesson);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message : 'Failed to uodate lesson', error })
  }
}

import { Lesson } from "../models/index.js";

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
    const lessons = await Lesson.find({ course: req.params.courseId});
    if (!lessons) return res.status(404).json({ message: 'Lesson not found'});
    res.status(200).json(lessons);
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error });
  }
}

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



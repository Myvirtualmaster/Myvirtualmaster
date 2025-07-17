import { Quiz } from "../models/index.js";
import { paginate } from "../utils/paginate.js";

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({ ...req.body, lesson: req.params.lessonId });

    await quiz.save();
    res.status(201).json(quiz);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

export const getQuizByLesson = async (req, res) => {
  try {
    const queryBuilder = Quiz.find({ lesson: req.params.lessonId });

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 },
    });

    if (result.data.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this lesson.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json(quiz);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz', error });
  }
}

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found'});

    res.status(200).json({ message: 'Quiz deeleted' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete quiz' , error });
  }
}

export const updateQuiz = async (req, res) => {
  try {
    const updateQuiz = await Quiz.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});
    if (!updateQuiz) return res.status(404).json({ message: 'Quiz not found'});

    res.status(200).json(updateQuiz);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update quiz', error });
  }
}



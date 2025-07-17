import { Question } from "../models/index.js";
import { paginate } from "../utils/paginate.js";

export const createQuestion = async (req, res) => {
  try {
    const question = new Question({ ...req.body, quiz: req.params.quizId });

    await question.save();
    res.status(201).json(question)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

export const getQuestionByQuiz = async (req, res) => {
  try {
    const queryBuilder = Question.find({ quiz: req.params.quizId });

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json(question);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch question', error });
  }
}

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found'});

    res.status(200).json({ message: 'Question deleted' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete question' , error });
  }
}

export const updateQuestion = async (req, res) => {
  try {
    const updateQuestion = await Question.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});
    if (!updateQuestion) return res.status(404).json({ message: 'Question not found'});

    res.status(200).json(updateQuestion);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update question', error });
  }
}



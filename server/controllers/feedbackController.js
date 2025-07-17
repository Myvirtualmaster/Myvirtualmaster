import { LessonFeedback } from "../models/index.js";
import { paginate } from "../utils/paginate.js";

export const createFeedback = async (req, res) => {
  try {
    const feedback = new LessonFeedback({ ...req.body, user: req.user.id});
    await feedback.save();
    res.status(201).json(feedback);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

export const getAllFeedback = async (req, res) => {
  try {
    const queryBuilder = LessonFeedback.find();

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 }
    });

    if (!result.data.length) {
      return res.status(404).json({ message: 'No feedback found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch feedback', error });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await LessonFeedback.findById(req.params.id);

    if (!feedback) return res.status(404).json({ message: 'Feedback not found' })

    res.status(200).json(feedback);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  } 

}

export const getFeedbackByLesson = async (req, res) => {
  try {
    const queryBuilder = LessonFeedback.find({ lesson: req.params.lessonId });

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 }
    });

    if (!result.data.length) {
      return res.status(404).json({ message: 'No feedback found for this lesson' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await LessonFeedback.findByIdAndDelete(req.params.id);

    if(!feedback) return res.status(404).json({ message: 'Feedback not found'});

    res.status(200).json({ message: 'Feedback deleted' });
    
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  } 
}

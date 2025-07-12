import { LessonFeedback } from "../models/index.js";

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
    const feedbacks = await LessonFeedback.find()
    
    if (!feedbacks) return res.status(404).json({ message: 'Feedback not found' })

    res.status(200).json(feedbacks);    
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch feedback', error });
  }
}

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
    const feedback = await LessonFeedback.find({ lesson: req.params.lessonId });

    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json(feedback);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

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

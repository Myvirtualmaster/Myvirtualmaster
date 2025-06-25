import mongoose from 'mongoose';

const lessonFeedbackSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Lessonfeedback', lessonFeedbackSchema);


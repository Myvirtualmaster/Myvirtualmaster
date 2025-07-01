import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  attempted_at: {
    type: Date,
    default: Date.now(),
  }
})

export default mongoose.model('QuizAttempt', quizAttemptSchema);

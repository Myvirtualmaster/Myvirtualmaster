import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

export default mongoose.model('Quiz', quizSchema);

import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },

  option_a: {
    type: String,
    required: true,
    trim: true,
  },
  option_b: {
    type: String,
    required: true,
    trim: true,
  },
  option_c: {
    type: String,
    required: true,
    trim: true,
  },
  option_d: {
    type: String,
    required: true,
    trim: true,
  },
  correct_ans: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true,
  }
})

export default mongoose.model('Question', questionSchema);

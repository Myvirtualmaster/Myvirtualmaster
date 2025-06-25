import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  lessons: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  total_lessons: {
    type: Number,
    required: true,
  },
  progress_percentage: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Progress', progressSchema);

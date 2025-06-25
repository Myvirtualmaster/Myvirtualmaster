import mongoose from 'mongoose';

const courseReviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Coursereview', courseReviewSchema);

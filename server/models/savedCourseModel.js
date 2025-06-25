import mongoose from 'mongoose';

const savedCourseSchema = new mongoose.Schema({
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
  saved_at: {
    type: Date,
  },
})

export default mongoose.model('Savedcourse', savedCourseSchema);

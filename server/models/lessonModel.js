import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

export default mongoose.model('Lesson', lessonSchema);

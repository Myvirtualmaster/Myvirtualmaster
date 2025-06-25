import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  file_url: {
    type: String,
  },
  file_type: {
    type: String,
  }
})

export default mongoose.model('Resource', resourceSchema);

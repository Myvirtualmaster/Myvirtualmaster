import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
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
  certificate_url: {
    type: String,
    required: true,
  },
  issued_at: {
    type: Date,
  },
})

export default mongoose.model('Certificate', certificateSchema);

import mongoose from 'mongoose';

const mediaSubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  media_type: {
    type: String,
    enum: ['audio', 'video'],
    required: true
  },
  media_url: {
    type: String,
    required: true
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MediaSubmission', mediaSubmissionSchema);


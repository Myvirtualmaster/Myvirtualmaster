import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // submitted url 
  file_url: {
    type: String,
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: Number,
  },
})

export default mongoose.model('Submission', submissionSchema);

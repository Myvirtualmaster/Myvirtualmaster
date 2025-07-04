import mongoose from 'mongoose';

const courseSubmissionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  feedback: {
    type: String,
  },
  reviewed_at: {
    type: Date,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

export default mongoose.model('CourseSubmission', courseSubmissionSchema);


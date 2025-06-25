import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  send_at: {
    type: Date,
    default: Date.now,
  },
  is_read: {
    type: Boolean,
  },
})

export default mongoose.model('Message', messageSchema);

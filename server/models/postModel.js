import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  forum: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  resolved: { type: Boolean, default: false },
  reported: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Post', postSchema);


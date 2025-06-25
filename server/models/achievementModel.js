import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon_url: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Achievement', achievementSchema);

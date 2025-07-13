import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
    required: true 
  },
  awarded_at: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('UserAchievement', userAchievementSchema);


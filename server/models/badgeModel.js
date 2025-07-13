import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon_url: {
    type: String,
  },
})

export default mongoose.model('Badge', badgeSchema);
